import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RoleType } from '../../constants/role-type.ts';
import { TokenType } from '../../constants/token-type.ts';
import { UserNotFoundException } from '../../exceptions/user-not-found.exception.ts';
import { ApiConfigService } from '../../shared/services/api-config.service.ts';
import { UserEntity } from '../user/user.entity.ts';
import { AuthResponseDto, TokenPayloadDto } from './dto/auth-responses.dto.ts';
import { ChangePasswordDto, UserLoginDto, Verify2FADto } from './dto/auth-requests.dto.ts';
import { TwoFactorAuthService } from './two-factor-auth.service.ts';

@Injectable()
export class AuthService {
  private refreshTokens: Map<string, string> = new Map();

  constructor(
    private jwtService: JwtService,
    private configService: ApiConfigService,
    private twoFaService: TwoFactorAuthService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async login(loginDto: UserLoginDto): Promise<AuthResponseDto> {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UserNotFoundException();
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account is deactivated');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password || '');

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.role === RoleType.SUPER_ADMIN) {
      if (!loginDto.twoFaCode) {
        return {
          user: this.mapUserToResponse(user),
          tokens: new TokenPayloadDto({ expiresIn: 0, token: '' }),
          requires2FA: true,
        };
      }

      if (!user.twoFaSecret) {
        throw new BadRequestException('2FA not configured for this user');
      }

      const isValid2FA = this.twoFaService.verifyTOTP(user.twoFaSecret, loginDto.twoFaCode);

      if (!isValid2FA) {
        throw new UnauthorizedException('Invalid 2FA code');
      }
    }

    user.lastLoginAt = new Date();
    await this.userRepository.save(user);

    const tokens = await this.createTokens(user.id, user.role);

    return {
      user: this.mapUserToResponse(user),
      tokens,
      requires2FA: false,
    };
  }

  async verify2FAAndLogin(verifyDto: Verify2FADto): Promise<AuthResponseDto> {
    const user = await this.userRepository.findOne({
      where: { email: verifyDto.email },
    });

    if (!user || user.role !== RoleType.SUPER_ADMIN) {
      throw new UserNotFoundException();
    }

    if (!user.twoFaSecret) {
      throw new BadRequestException('2FA not configured');
    }

    const isValid2FA = this.twoFaService.verifyTOTP(user.twoFaSecret, verifyDto.twoFaCode);

    if (!isValid2FA) {
      throw new UnauthorizedException('Invalid 2FA code');
    }

    user.lastLoginAt = new Date();
    await this.userRepository.save(user);

    const tokens = await this.createTokens(user.id, user.role);

    return {
      user: this.mapUserToResponse(user),
      tokens,
      requires2FA: false,
    };
  }

  async refreshToken(refreshToken: string): Promise<TokenPayloadDto> {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken);
      
      if (payload.type !== TokenType.REFRESH_TOKEN) {
        throw new UnauthorizedException('Invalid token type');
      }

      const storedToken = this.refreshTokens.get(payload.userId);
      if (storedToken !== refreshToken) {
        throw new UnauthorizedException('Token has been revoked');
      }

      const user = await this.userRepository.findOne({
        where: { id: payload.userId },
      });

      if (!user || !user.isActive) {
        throw new UnauthorizedException('User not found or deactivated');
      }

      return this.createTokens(user.id, user.role);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: string): Promise<void> {
    this.refreshTokens.delete(userId);
  }

  async changePassword(userId: string, changeDto: ChangePasswordDto): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new UserNotFoundException();
    }

    const isCurrentPasswordValid = await bcrypt.compare(
      changeDto.currentPassword,
      user.password || '',
    );

    if (!isCurrentPasswordValid) {
      throw new BadRequestException('Current password is incorrect');
    }

    const hashedNewPassword = await bcrypt.hash(changeDto.newPassword, 10);
    user.password = hashedNewPassword;
    user.isFirstLogin = false;

    await this.userRepository.save(user);
  }

  private async createTokens(userId: string, role: RoleType): Promise<TokenPayloadDto> {
    const accessToken = await this.jwtService.signAsync({
      userId,
      type: TokenType.ACCESS_TOKEN,
      role,
    }, {
      expiresIn: '1h',
    });

    const refreshToken = await this.jwtService.signAsync({
      userId,
      type: TokenType.REFRESH_TOKEN,
      role,
    }, {
      expiresIn: '7d',
    });

    this.refreshTokens.set(userId, refreshToken);

    return new TokenPayloadDto({
      expiresIn: 3600,
      token: accessToken,
      refreshToken,
    });
  }

  private mapUserToResponse(user: UserEntity): AuthResponseDto['user'] {
    return {
      id: user.id,
      email: user.email || '',
      fullName: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
      role: user.role,
      region: user.region,
      isActive: user.isActive,
      isFirstLogin: user.isFirstLogin,
      lastLoginAt: user.lastLoginAt,
    };
  }

  async setup2FA(userId: string): Promise<{ secret: string; qrCodeUrl: string }> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    
    if (!user || user.role !== RoleType.SUPER_ADMIN) {
      throw new BadRequestException('Only Super Admin can setup 2FA');
    }

    const secret = this.twoFaService.generateSecret();
    user.twoFaSecret = secret;
    await this.userRepository.save(user);

    const qrCodeUrl = this.twoFaService.generateQRCodeUrl(user.email || '', secret);

    return { secret, qrCodeUrl };
  }
}

import { Body, Controller, Get, HttpCode, HttpStatus, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { RoleType } from '../../constants/role-type.ts';
import { AuthUser } from '../../decorators/auth-user.decorator.ts';
import { Auth } from '../../decorators/http.decorators.ts';
import { UserEntity } from '../user/user.entity.ts';
import { AuthService } from './auth.service.ts';
import { AuthResponseDto, TokenPayloadDto } from './dto/auth-responses.dto.ts';
import { ChangePasswordDto, RefreshTokenDto, UserLoginDto, Verify2FADto } from './dto/auth-requests.dto.ts';
import { TwoFactorAuthService } from './two-factor-auth.service.ts';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private twoFaService: TwoFactorAuthService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: AuthResponseDto,
    description: 'User login - returns JWT or requires 2FA',
  })
  async login(@Body() loginDto: UserLoginDto): Promise<AuthResponseDto> {
    return this.authService.login(loginDto);
  }

  @Post('verify-2fa')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: AuthResponseDto,
    description: 'Verify 2FA code for Super Admin',
  })
  async verify2FA(@Body() verifyDto: Verify2FADto): Promise<AuthResponseDto> {
    return this.authService.verify2FAAndLogin(verifyDto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: TokenPayloadDto,
    description: 'Refresh access token',
  })
  async refreshToken(@Body() refreshDto: RefreshTokenDto): Promise<TokenPayloadDto> {
    return this.authService.refreshToken(refreshDto.refreshToken);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @Auth([RoleType.SUPER_ADMIN, RoleType.ADMIN, RoleType.OWNER, RoleType.USER])
  @ApiBearerAuth()
  async logout(@AuthUser() user: UserEntity): Promise<{ message: string }> {
    await this.authService.logout(user.id);
    return { message: 'Logged out successfully' };
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @Auth([RoleType.SUPER_ADMIN, RoleType.ADMIN, RoleType.OWNER, RoleType.USER])
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Get current user profile' })
  getCurrentUser(@AuthUser() user: UserEntity): UserEntity {
    return user;
  }

  @Patch('me/password')
  @HttpCode(HttpStatus.OK)
  @Auth([RoleType.SUPER_ADMIN, RoleType.ADMIN, RoleType.OWNER, RoleType.USER])
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Change own password' })
  async changePassword(
    @AuthUser() user: UserEntity,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<{ message: string }> {
    await this.authService.changePassword(user.id, changePasswordDto);
    return { message: 'Password changed successfully' };
  }
}

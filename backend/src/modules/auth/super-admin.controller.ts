import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { RoleType } from '../../constants/role-type.ts';
import { AuthUser } from '../../decorators/auth-user.decorator.ts';
import { Auth } from '../../decorators/http.decorators.ts';
import { UserEntity } from '../user/user.entity.ts';

class CreateAdminDto {
  email!: string;
  firstName!: string;
  lastName!: string;
  region!: string;
  phone?: string;
}

class UpdateAdminDto {
  email?: string;
  firstName?: string;
  lastName?: string;
  region?: string;
  phone?: string;
  isActive?: boolean;
}

@ApiBearerAuth()
@ApiTags('super-admin')
@Controller('super-admin')
@Auth([RoleType.SUPER_ADMIN])
export class SuperAdminController {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  @Post('admins')
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ description: 'Create new Admin account' })
  async createAdmin(
    @AuthUser() superAdmin: UserEntity,
    @Body() createDto: CreateAdminDto,
  ): Promise<UserEntity> {
    // Generate temporary password
    const tempPassword = this.generateTempPassword();
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const admin = this.userRepository.create({
      email: createDto.email,
      firstName: createDto.firstName,
      lastName: createDto.lastName,
      region: createDto.region,
      phone: createDto.phone || null,
      role: RoleType.ADMIN,
      password: hashedPassword,
      isActive: true,
      isFirstLogin: true,
      createdById: superAdmin.id,
    });

    await this.userRepository.save(admin);

    // TODO: Send email with temporary password
    console.log(`📧 Email sent to ${createDto.email} with temp password: ${tempPassword}`);

    return admin;
  }

  @Get('admins')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'List all Admins' })
  async listAdmins(): Promise<UserEntity[]> {
    return this.userRepository.find({
      where: { role: RoleType.ADMIN },
      relations: ['createdBy'],
    });
  }

  @Get('admins/:id')
  @HttpCode(HttpStatus.OK)
  async getAdmin(@Param('id') id: string): Promise<UserEntity> {
    const admin = await this.userRepository.findOne({
      where: { id, role: RoleType.ADMIN },
      relations: ['createdBy'],
    });

    if (!admin) {
      throw new Error('Admin not found');
    }

    return admin;
  }

  @Patch('admins/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Update Admin (activate/deactivate/modify)' })
  async updateAdmin(
    @Param('id') id: string,
    @Body() updateDto: UpdateAdminDto,
  ): Promise<UserEntity> {
    const admin = await this.userRepository.findOne({
      where: { id, role: RoleType.ADMIN },
    });

    if (!admin) {
      throw new Error('Admin not found');
    }

    Object.assign(admin, updateDto);
    await this.userRepository.save(admin);

    return admin;
  }

  private generateTempPassword(): string {
    return Math.random().toString(36).slice(-10) + Math.random().toString(36).slice(-2).toUpperCase();
  }
}

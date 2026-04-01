import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { RoleType } from '../../constants/role-type.ts';
import { AuthUser } from '../../decorators/auth-user.decorator.ts';
import { Auth } from '../../decorators/http.decorators.ts';
import { UserEntity } from '../user/user.entity.ts';

class CreateOwnerDto {
  email!: string;
  firstName!: string;
  lastName!: string;
  phone!: string;
}

class UpdateOwnerDto {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  isActive?: boolean;
}

@ApiBearerAuth()
@ApiTags('admin')
@Controller('admin')
@Auth([RoleType.ADMIN])
export class AdminController {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  @Post('owners')
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ description: 'Create new Owner account' })
  async createOwner(
    @AuthUser() admin: UserEntity,
    @Body() createDto: CreateOwnerDto,
  ): Promise<UserEntity> {
    // Generate temporary password
    const tempPassword = this.generateTempPassword();
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const owner = this.userRepository.create({
      email: createDto.email,
      firstName: createDto.firstName,
      lastName: createDto.lastName,
      phone: createDto.phone,
      role: RoleType.OWNER,
      region: admin.region, // Owner inherits Admin's region
      password: hashedPassword,
      isActive: true,
      isFirstLogin: true,
      createdById: admin.id,
    });

    await this.userRepository.save(owner);

    // TODO: Send email with credentials
    console.log(`📧 Email sent to ${createDto.email} with temp password: ${tempPassword}`);

    return owner;
  }

  @Get('owners')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'List Owners in my region' })
  async listOwners(@AuthUser() admin: UserEntity): Promise<UserEntity[]> {
    return this.userRepository.find({
      where: {
        role: RoleType.OWNER,
        region: admin.region,
      },
      relations: ['createdBy'],
    });
  }

  @Get('owners/:id')
  @HttpCode(HttpStatus.OK)
  async getOwner(
    @AuthUser() admin: UserEntity,
    @Param('id') id: string,
  ): Promise<UserEntity> {
    const owner = await this.userRepository.findOne({
      where: {
        id,
        role: RoleType.OWNER,
        region: admin.region,
      },
      relations: ['createdBy'],
    });

    if (!owner) {
      throw new Error('Owner not found or not in your region');
    }

    return owner;
  }

  @Patch('owners/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Update Owner (modify/deactivate)' })
  async updateOwner(
    @AuthUser() admin: UserEntity,
    @Param('id') id: string,
    @Body() updateDto: UpdateOwnerDto,
  ): Promise<UserEntity> {
    const owner = await this.userRepository.findOne({
      where: {
        id,
        role: RoleType.OWNER,
        region: admin.region,
      },
    });

    if (!owner) {
      throw new Error('Owner not found or not in your region');
    }

    Object.assign(owner, updateDto);
    await this.userRepository.save(owner);

    return owner;
  }

  private generateTempPassword(): string {
    return Math.random().toString(36).slice(-10) + Math.random().toString(36).slice(-2).toUpperCase();
  }
}

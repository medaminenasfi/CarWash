import { IsOptional, IsString } from 'class-validator';

import { EmailField, StringField } from '../../../decorators/field.decorators.ts';

export class UserLoginDto {
  @EmailField()
  readonly email!: string;

  @StringField()
  readonly password!: string;

  @IsString()
  @IsOptional()
  readonly twoFaCode?: string;
}

export class Verify2FADto {
  @EmailField()
  readonly email!: string;

  @StringField()
  readonly twoFaCode!: string;
}

export class ChangePasswordDto {
  @StringField()
  readonly currentPassword!: string;

  @StringField()
  readonly newPassword!: string;
}

export class RefreshTokenDto {
  @StringField()
  readonly refreshToken!: string;
}

export class LogoutDto {
  @IsOptional()
  @IsString()
  readonly refreshToken?: string;
}

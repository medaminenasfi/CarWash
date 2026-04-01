import { Expose } from 'class-transformer';

import { RoleType } from '../../../constants/role-type.ts';

export class TokenPayloadDto {
  @Expose()
  expiresIn!: number;

  @Expose()
  token!: string;

  @Expose()
  refreshToken?: string;

  constructor(data: Partial<TokenPayloadDto>) {
    Object.assign(this, data);
  }
}

export class AuthResponseDto {
  @Expose()
  user!: {
    id: string;
    email: string;
    fullName: string;
    role: RoleType;
    region: string | null;
    isActive: boolean;
    isFirstLogin: boolean;
    lastLoginAt: Date | null;
  };

  @Expose()
  tokens!: TokenPayloadDto;

  @Expose()
  requires2FA?: boolean;
}

export class TwoFASecretDto {
  @Expose()
  secret!: string;

  @Expose()
  qrCodeUrl!: string;
}

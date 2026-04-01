export enum RoleType {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  OWNER = 'OWNER',
  USER = 'USER',
}

export const RoleHierarchy = {
  [RoleType.SUPER_ADMIN]: [RoleType.ADMIN],
  [RoleType.ADMIN]: [RoleType.OWNER],
  [RoleType.OWNER]: [],
  [RoleType.USER]: [],
};

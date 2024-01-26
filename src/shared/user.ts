export enum UserAccountType {
  COMMON = 'обычный',
  PRO = 'pro',
}

export type User = {
  name: string;
  email: string;
  avatarPath?: string;
  accountType: UserAccountType;
}

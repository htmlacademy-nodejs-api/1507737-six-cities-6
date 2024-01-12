export enum UserAccountTypeEnum {
  COMMON = 'common',
  PRO = 'pro',
}

export type User = {
  name: string;
  email: string;
  avatarPath?: string;
  accountType: 'common' | 'pro';
}

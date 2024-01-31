import { UserAccountType } from './user-account.enum.js';

export type User = {
  name: string;
  email: string;
  avatarPath?: string;
  accountType: UserAccountType;
}

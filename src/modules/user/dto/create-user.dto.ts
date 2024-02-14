import { UserAccountType } from '../types/user.enum.js';

export class CreateUserDto {
  name!: string;
  email!: string;
  avatar?: string;
  password!: string;
  accountType!: UserAccountType;
}

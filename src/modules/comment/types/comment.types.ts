import { User } from '../../user/types/user.types.js';

export type Comment = {
  text: string;
  publishAt: string;
  rating: number;
  author: User;
}

import { User } from './user.js';

export type Comment = {
  text: string;
  publishAt: string;
  rating: number;
  author: User;
}

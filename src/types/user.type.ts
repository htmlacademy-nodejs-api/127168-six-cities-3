import { UserStatus } from './user-status.enum.js';

export type User = {
  username: string;
  email: string;
  avatar: string;
  userStatus: UserStatus;
}

import { UserStatus } from '../../../types/user-status.enum.js';

export default class CreateUserDTO {
  public username!: string;
  public email!: string;
  public avatar!: string;
  public userStatus!: UserStatus;
  public password!: string;
}

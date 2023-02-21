import { Expose } from 'class-transformer';
import { UserStatus } from '../../../types/user-status.enum.js';

export default class UserResponse {
  @Expose()
  public id!: string;

  @Expose()
  public username!: string;

  @Expose()
  public email!: string ;

  @Expose()
  public avatar!: string;

  @Expose()
  public userStatus!: UserStatus;
}

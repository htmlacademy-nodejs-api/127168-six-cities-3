import {Expose} from 'class-transformer';

export default class LoggedUserResponse {
  @Expose()
  public token!: string;

  @Expose()
  public id!: string;

  @Expose()
  public username!: string;

  @Expose()
  public avatar!: string;

  @Expose()
  public email!: string;

  @Expose()
  public userStatus!: string;
}

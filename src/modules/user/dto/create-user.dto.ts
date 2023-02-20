import { IsEmail, IsEnum, MaxLength, MinLength } from 'class-validator';
import { UserStatus } from '../../../types/user-status.enum.js';

export default class CreateUserDTO {
  @MinLength(1, {message: 'Minimum username length must be 1'})
  @MaxLength(15, {message: 'Maximum username length must be 15'})
  public username!: string;

  @IsEmail({}, {message: 'email must be valid address'})
  public email!: string;

  @IsEnum(UserStatus, {message: 'type must be Standart or Pro'})
  public userStatus!: UserStatus;

  @MinLength(6, {message: 'Minimum password length must be 6'})
  @MaxLength(12, {message: 'Maximum password length must be 12'})
  public password!: string;
}

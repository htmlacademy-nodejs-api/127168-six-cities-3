import { IsEmail, MaxLength, MinLength } from 'class-validator';

export default class LoginUserDTO {
  @IsEmail({}, {message: 'email must be valid address'})
  public email!: string;

  @MinLength(6, {message: 'Minimum password length must be 6'})
  @MaxLength(12, {message: 'Maximum password length must be 12'})
  public password!: string;
}

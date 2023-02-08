import { createSHA256 } from '../../utils/common.js';
import typegoose, {defaultClasses, getModelForClass, modelOptions} from '@typegoose/typegoose';
import { User } from '../../types/user.type.js';
import { UserStatus } from '../../types/user-status.enum.js';

const {prop} = typegoose;

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})
export class UserEntity extends defaultClasses.TimeStamps implements User {
  constructor(data: User) {
    super();

    this.username = data.username;
    this.email = data.email;
    this.avatar = data.avatar;
    this.userStatus = data.userStatus;
  }

  @prop({required: true, default: ''})
  public username!: string;

  @prop({required: true, unique: true})
  public email!: string;

  @prop({default: ''})
  public avatar: string | undefined;

  @prop({required: true, default: ''})
  public userStatus!: UserStatus;

  @prop({required: true, default: ''})
  public password!: string;

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);

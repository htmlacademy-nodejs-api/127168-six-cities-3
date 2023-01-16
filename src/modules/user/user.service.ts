import CreateUserDTO from './dto/create-user.dto.js';
import {DocumentType} from '@typegoose/typegoose/lib/types.js';
import {UserEntity, UserModel} from './user.entity.js';
import {UserServiceInterface} from './user-service.interface.js';

export default class UserService implements UserServiceInterface {
  public async create(dto: CreateUserDTO, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    return UserModel.create(user);
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return UserModel.findOne({email});
  }

  public async findOrCreate(dto: CreateUserDTO, salt: string): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findByEmail(dto.email);

    if (existedUser) {
      return existedUser;
    }

    return this.create(dto, salt);
  }
}

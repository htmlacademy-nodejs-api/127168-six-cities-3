import CreateUserDTO from './dto/create-user.dto.js';
import {DocumentType} from '@typegoose/typegoose';
import {UserEntity} from './user.entity.js';
import LoginUserDTO from './dto/login-user.dto.js';
import UpdateUserDTO from './dto/update-user.dto.js';

export interface UserServiceInterface {
  create(dto: CreateUserDTO, salt: string): Promise<DocumentType<UserEntity>>;
  updateById(userId: string, dto: UpdateUserDTO): Promise<DocumentType<UserEntity> | null>
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(dto: CreateUserDTO, salt: string): Promise<DocumentType<UserEntity>>;
  verifyUser(dto: LoginUserDTO, salt: string): Promise<DocumentType<UserEntity> | null>;
  exists(documentId: string): Promise<boolean>;
}

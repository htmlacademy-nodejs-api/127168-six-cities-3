import { Container } from 'inversify';
import { Component } from '../../types/component.types.js';
import { types } from '@typegoose/typegoose';
import { UserEntity, UserModel } from './user.entity.js';
import UserService from './user.service.js';
import { UserServiceInterface } from './user-service.interface.js';
import UserController from './user.controller.js';
import { ControllerInterface } from '../../common/controller/controller.interface.js';

const userContainer = new Container();

userContainer.bind<UserServiceInterface>(Component.UserServiceInterface).to(UserService);
userContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
userContainer.bind<ControllerInterface>(Component.UserController).to(UserController).inSingletonScope();

export {userContainer};

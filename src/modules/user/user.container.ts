import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';

import { Component } from '../../types/component.enum.js';
import { UserModel } from '../models.js';
import { UserService } from './types/user.service.interface.js';
import { UserEntity } from './user.entity.js';
import { UserServiceImpl } from './user.service.js';

export function createUserContainer() {
  const container = new Container();

  container.bind<UserService>(Component.UserService).to(UserServiceImpl);
  container.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);

  return container;
}

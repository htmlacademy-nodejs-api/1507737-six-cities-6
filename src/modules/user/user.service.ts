import { types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';

import { Logger } from '#modules/logger/index.js';
import { Component } from '#types/component.enum.js';

import { CreateUserDto } from './dto/create-user.dto.js';
import { UserService } from './types/user.service.interface.js';
import { UserEntity } from './user.entity.js';

@injectable()
export class UserServiceImpl implements UserService {
  constructor(
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>,
    @inject(Component.Logger) private readonly logger: Logger,
  ) {}

  public async create(dto: CreateUserDto) {
    const user = await this.userModel.create(dto);
    this.logger.info(`new user created: ${user.id}`);
    return user;
  }

  public async findById(id: string) {
    return this.userModel.findById(id).exec();
  }

}

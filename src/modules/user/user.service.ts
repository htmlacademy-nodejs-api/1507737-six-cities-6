import { types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';

import { Logger } from '../../lib/logger/types/logger.interface.js';
import { Component } from '../../types/component.enum.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { IdType, UserService } from './types/user.service.interface.js';
import { UserEntity } from './user.entity.js';

@injectable()
export class UserServiceImpl implements UserService {
  constructor(
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>,
    @inject(Component.Logger) private readonly logger: Logger,
  ) {}

  public async create(dto: CreateUserDto, salt: string) {
    const newUser = new UserEntity(dto, salt);

    const result = await this.userModel.create(newUser);
    this.logger.info(`new user created: ${result.id}`);
    return result;
  }

  public async findUnique(id: IdType) {
    return this.userModel.findOne(id).exec();
  }
}

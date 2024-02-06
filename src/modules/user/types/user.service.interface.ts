import { DocumentType } from '@typegoose/typegoose';

import { CreateUserDto } from '../dto/create-user.dto.js';
import { UserEntity } from '../user.entity.js';

export interface UserService {
  create(dto: CreateUserDto): Promise<DocumentType<UserEntity>>;
  findById(id: string): Promise<DocumentType<UserEntity> | null>;
}

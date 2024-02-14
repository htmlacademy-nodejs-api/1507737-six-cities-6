import { DocumentType } from '@typegoose/typegoose';

import { CreateUserDto } from '../dto/create-user.dto.js';
import { UserEntity } from '../user.entity.js';

export type IdType = { email?: string } | { id?: string }

export interface UserService {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findUnique(id: IdType): Promise<DocumentType<UserEntity> | null>;
}

import { modelOptions, prop,Ref } from '@typegoose/typegoose';

import { createSHA256 } from '../../utils/common.js';
import { getRandomAvatarUrl } from '../../utils/generate.js';
import { CommentEntity } from '../comment/comment.entity.js';
import { OfferEntity } from '../offer/offer.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UserAccountType } from './types/user.enum.js';

@modelOptions({
  schemaOptions: {
    id: true,
    collection: 'users',
    timestamps: true,
  }
})
export class UserEntity {
  @prop({ required: true, trim: true, type: () => String })
  public name!: string;

  @prop({ required: true, unique: true, type: () => String })
  public email!: string;

  @prop({ required: false, default: getRandomAvatarUrl(), type: () => String })
  public avatar?: string;

  @prop({ required: true, type: () => String })
  public passwordHash!: string;

  @prop({
    ref: () => OfferEntity,
    default: [],
    _id: false
  })
  public favorites!: Ref<OfferEntity>[];

  @prop({
    ref: () => CommentEntity,
    default: [],
    _id: false
  })
  public comments!: Ref<CommentEntity>[];

  @prop({
    required: true,
    type: () => String,
  })
  public accountType: UserAccountType;

  constructor(user: CreateUserDto, salt: string) {
    this.name = user.name;
    this.email = user.email;
    this.accountType = user.accountType;
    this.avatar = user.avatar;
    this.passwordHash = createSHA256(user.password, salt);
  }
}

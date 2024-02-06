import { getModelForClass, modelOptions, prop,Ref } from '@typegoose/typegoose';

import { CommentEntity } from '#modules/comment/index.js';
import { OfferEntity } from '#modules/offer/index.js';
import { UserAccountType } from '#types/user-account.enum.js';
import { getRandomAvatarUrl } from '#utils/generate.js';

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

  @prop({ default: getRandomAvatarUrl(), type: () => String })
  public avatar!: string;

  @prop({ required: true, type: () => String })
  public passwordHash!: string;

  @prop({
    ref: () => OfferEntity,
    default: [],
    _id: false
  })
  public offers!: Ref<OfferEntity>[];

  @prop({
    ref: () => CommentEntity,
    default: [],
    _id: false
  })
  public comments!: Ref<CommentEntity>[];

  @prop({
    type: () => String,
    enum: UserAccountType,
    default: UserAccountType.COMMON
  })
  public accountType?: UserAccountType;
}

export const UserModel = getModelForClass(UserEntity);

import { modelOptions, prop, Ref } from '@typegoose/typegoose';

import { CommentEntity } from '../comment/comment.entity.js';
import { UserEntity } from '../user/user.entity.js';
import { OfferCity, OfferImporovements, OfferType } from './types/offer.enum.js';
import type { OfferLocation } from './types/offer.types.js';

@modelOptions({
  schemaOptions: {
    id: true,
    collection: 'offers',
    timestamps: true,
  }
})
export class OfferEntity {
  @prop({ required: true, trim: true })
  public name!: string;

  @prop({ required: true, trim: true })
  public description!: string;

  @prop({
    required: true,
    type: () => String
  })
  public city!: OfferCity;

  @prop({ required: true })
  public preview!: string;

  @prop({ required: true, type: () => [String] })
  public housingPhotos!: string[];

  @prop({ required: true })
  public isPremium!: boolean;

  @prop({ required: false, default: 0 })
  public rating?: number;

  @prop({
    required: true,
    type: () => String
  })
  public type!: OfferType;

  @prop({ required: true })
  public roomsCount!: number;

  @prop({ required: true })
  public guestsCount!: number;

  @prop({ required: true })
  public rentalPrice!: number;

  @prop({
    required: true,
    type: () => [String],
  })
  public imrovements!: OfferImporovements[];

  @prop({ default: 0 })
  public commentCount!: number;

  @prop({
    required: true,
    type: () => Object,
  })
  public location!: OfferLocation;

  @prop({
    ref: () => UserEntity,
    _id: false
  })
  public userId?: Ref<UserEntity>;

  @prop({
    ref: () => CommentEntity,
    required: false,
    default: [],
    _id: false
  })
  public comments?: Ref<CommentEntity>[];
}


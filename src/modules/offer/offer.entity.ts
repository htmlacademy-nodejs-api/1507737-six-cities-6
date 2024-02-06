import { modelOptions, prop, Ref } from '@typegoose/typegoose';

import { CommentEntity } from '#modules/comment/index.js';
import { UserEntity } from '#modules/user/index.js';

import { OfferCity, OfferImporovements, OfferType } from './types/offer.enum.js';
import { OfferCoordinate } from './types/offer.types.js';

@modelOptions({
  schemaOptions: {
    id: true,
    collection: 'offers',
    timestamps: true,
  }
})
export class OfferEntity {
  @prop({ required: true, trim: true })
  public title!: string;

  @prop({ required: true, trim: true })
  public description!: string;

  @prop({
    required: true,
    type: () => String,
    enum: OfferCity,
  })
  public city!: string;

  @prop({ required: true })
  public preview!: string;

  @prop({ required: true })
  public housingPhotos!: string[];

  @prop({ required: true })
  public isPremium!: boolean;

  @prop({ required: true })
  public isFavorite!: boolean;

  @prop({ required: true })
  public rating!: number;

  @prop({
    required: true,
    type: () => String,
    enum: OfferType,
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
    type: () => String,
    enum: OfferImporovements,
  })
  public imrovements!: OfferImporovements[];

  @prop({ default: 0 })
  public commentCount!: number;

  @prop({required: true})
  public coordinate!: OfferCoordinate;

  @prop({ ref: () => UserEntity, required: true, _id: false })
  public user!: Ref<UserEntity>;

  @prop({ ref: () => CommentEntity, required: true, _id: false })
  public comments!: Ref<CommentEntity>[];
}


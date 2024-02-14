import { modelOptions, prop,Ref } from '@typegoose/typegoose';

import { OfferEntity } from '../offer/offer.entity.js';
import { UserEntity } from '../user/user.entity.js';

@modelOptions({
  schemaOptions: {
    id: true,
    collection: 'comments',
    timestamps: true,
  }
})
export class CommentEntity {
  @prop({ required: true, trim: true, type: () => String })
  public text!: string;

  @prop({ required: true, trim: true, type: () => String })
  public rating!: number;

  @prop({ ref: () => UserEntity, required: true, _id: false })
  public user!: Ref<UserEntity>;

  @prop({ ref: () => OfferEntity, required: true, _id: false })
  public offer!: Ref<OfferEntity>;
}

import { modelOptions, prop, Ref } from '@typegoose/typegoose';

import { OfferEntity } from '#modules/offer/index.js';

@modelOptions({
  schemaOptions: {
    id: true,
    collection: 'categories',
    timestamps: true
  }
})
export class CategoryEntity {
  @prop({ require: true, trim: true })
  public name!: string;

  @prop({ require: true })
  public image!: string;

  @prop({ ref: () => OfferEntity, required: true, _id: false })
  public offer!: Ref<OfferEntity>;
}

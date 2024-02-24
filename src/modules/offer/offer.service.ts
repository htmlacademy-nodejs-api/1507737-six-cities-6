
import { types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';

import { Component } from '../../types/component.enum.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { EditOfferDto } from './dto/edit-offer.dto.js';
import { FIND_OFFERS_LIMIT } from './offer.constants.js';
import { OfferEntity } from './offer.entity.js';
import { OfferService } from './types/offer.service.interface.js';

@injectable()
export class OfferServiceImpl implements OfferService {
  private readonly userFields = ['name', 'avatar', 'email', 'accountType'];
  private readonly offerFields = ['name', 'city', 'preview', 'isPremium', 'type', 'rentalPrice', 'rating', 'commentCount', 'createdAt'];

  constructor(
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
  ) {}

  public async create(dto: CreateOfferDto) {
    const offer = await this.offerModel.create(dto);
    return offer.populate('userId', this.userFields);
  }

  public async edit(dto: EditOfferDto, offerId: string) {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, { new: true })
      .populate('userId', this.userFields);
  }

  public async deleteById(offerId: string) {
    const result = await this.offerModel.findByIdAndDelete(offerId);
    return result;
  }

  public async findById(offerId: string) {
    return this.offerModel
      .findById(offerId)
      .populate('userId', this.userFields)
      .exec();
  }

  public async find() {
    return this.offerModel
      .find()
      .select(this.offerFields)
      .limit(FIND_OFFERS_LIMIT)
      .exec();
  }

  public async findFavorites() {
    return this.offerModel
      .find({ isPremium: 1 })
      .select(this.offerFields)
      .limit(FIND_OFFERS_LIMIT)
      .exec();
  }

  public async incCommentCount(offerId: string) {
    return this.offerModel
      .findByIdAndUpdate(offerId, {
        '$inc': { commentCount: 1 }
      })
      .exec();
  }
}


import { types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';

import type { Logger } from '../../lib/logger/types/logger.interface.js';
import { Component } from '../../types/component.enum.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { OfferEntity } from './offer.entity.js';
import { OfferService } from './types/offer.service.interface.js';

@injectable()
export class OfferServiceImpl implements OfferService {
  constructor(
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(Component.Logger) private readonly logger: Logger,
  ) {}

  public async create(dto: CreateOfferDto) {
    const offer = await this.offerModel.create(dto);
    this.logger.info(`new offer created: ${offer.id}`);
    return offer;
  }

  public async findById(offerId: string) {
    return this.offerModel.findById(offerId).exec();
  }
}

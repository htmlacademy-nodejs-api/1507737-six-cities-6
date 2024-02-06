import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';

import { Component } from '#types/component.enum.js';

import { OfferEntity } from './offer.entity.js';
import { OfferModel } from './offer.model.js';
import { OfferServiceImpl } from './offer.service.js';
import { OfferService } from './types/offer.service.interface.js';

export function createOfferContainer() {
  const container = new Container();

  container.bind<OfferService>(Component.OfferService).to(OfferServiceImpl);
  container.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);

  return container;
}

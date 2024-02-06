import { getModelForClass } from '@typegoose/typegoose';

import { OfferEntity } from './offer.entity.js';

export const OfferModel = getModelForClass(OfferEntity);

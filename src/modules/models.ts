import { getModelForClass } from '@typegoose/typegoose';

import { CommentEntity } from './comment/comment.entity.js';
import { OfferEntity } from './offer/offer.entity.js';
import { UserEntity } from './user/user.entity.js';

export const CommentModel = getModelForClass(CommentEntity);
export const UserModel = getModelForClass(UserEntity);
export const OfferModel = getModelForClass(OfferEntity);

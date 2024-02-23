import { OfferImporovements, OfferType } from '../modules/offer/types/offer.enum.js';
import { OfferLocation } from '../modules/offer/types/offer.types.js';
import { UserAccountType } from '../modules/user/types/user.enum.js';

export type MockOffer = {
  name: string;
  description: string;
  publishAt: string;
  city: string;
  preview: string;
  housingPhotos: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: OfferType;
  roomsCount: number;
  guestsCount: number;
  rentalPrice: number;
  improvements: OfferImporovements[];
  author: {
    accountType: UserAccountType,
    name: string;
    email: string;
    avatar: string;
  };
  commentsCount: number;
  coordinate: OfferLocation;
}

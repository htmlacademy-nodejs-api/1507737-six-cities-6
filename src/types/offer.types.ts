
import { OfferType } from '#modules/offer/index.js';
import { toBoolean } from '#utils/common.js';

import { User } from './user.types.js';
import { UserAccountType } from './user-account.enum.js';

export type Offer = {
  name: string;
  description: string;
  publishAt: string;
  city: string;
  previewImage: string;
  housingPhotos: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  housingType: OfferType;
  roomsCount: number;
  guestsCount: number;
  rentalPrice: number;
  improvements: string[];
  author: User;
  commentsCount: number;
  coordinates: string;
}

export function createOffer(offerData: string): Offer {
  const [
    name,
    description,
    publishAt,
    city,
    previewImage,
    housingPhotos,
    isPremium,
    isFavorite,
    rating,
    housingType,
    roomsCount,
    guestsCount,
    rentalPrice,
    improvements,
    email,
    userName,
    avatarPath,
    accountType,
    commentsCount,
    coordinates
  ] = offerData.replace('\n', '').split('\t');

  const author = {
    accountType: accountType as UserAccountType,
    email,
    name: userName,
    avatarPath
  };

  return {
    name,
    description,
    publishAt,
    city,
    previewImage,
    housingPhotos: housingPhotos.split(';'),
    isPremium: toBoolean(isPremium),
    isFavorite: toBoolean(isFavorite),
    rating: Number.parseFloat(rating),
    housingType: housingType as OfferType,
    roomsCount: Number(roomsCount),
    guestsCount: Number(guestsCount),
    rentalPrice: Number.parseInt(rentalPrice, 10),
    improvements: improvements.split(';'),
    author: author,
    commentsCount: Number(commentsCount),
    coordinates
  };
}

import { OfferImporovements, OfferType } from '../modules/offer/types/offer.enum.js';
import { OfferLocation } from '../modules/offer/types/offer.types.js';
import { UserAccountType } from '../modules/user/types/user.enum.js';
import { MockOffer} from '../types/mock.types.js';
import { toBoolean } from './common.js';

function parseCoordinateString(coordinateRaw: string): OfferLocation {
  const [latitude, longitude] = coordinateRaw.split(',');

  return {
    latitude: Number.parseFloat(latitude),
    longitude: Number.parseFloat(longitude)
  };
}

export function createMockOffer(offerData: string): MockOffer {
  const [
    name,
    description,
    publishAt,
    city,
    preview,
    housingPhotos,
    isPremium,
    isFavorite,
    rating,
    type,
    roomsCount,
    guestsCount,
    rentalPrice,
    improvements,
    email,
    userName,
    avatarPath,
    accountType,
    commentsCount,
    coordinate
  ] = offerData.replace('\n', '').split('\t');

  const author = {
    accountType: accountType as UserAccountType,
    email,
    name: userName,
    avatar: avatarPath
  };

  return {
    name,
    description,
    publishAt,
    city,
    preview,
    housingPhotos: housingPhotos.split(';'),
    isPremium: toBoolean(isPremium),
    isFavorite: toBoolean(isFavorite),
    rating: Number.parseFloat(rating),
    type: type as OfferType,
    roomsCount: Number(roomsCount),
    guestsCount: Number(guestsCount),
    rentalPrice: Number.parseInt(rentalPrice, 10),
    improvements: improvements.split(';') as OfferImporovements[],
    author: author,
    commentsCount: Number(commentsCount),
    coordinate: parseCoordinateString(coordinate),
  };
}

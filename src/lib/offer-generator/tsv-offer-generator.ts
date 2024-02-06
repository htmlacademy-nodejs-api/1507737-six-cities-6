import dayjs from 'dayjs';

import { MockServerData } from '#types/mock-server-data.types.js';
import { UserAccountType } from '#types/user-account.enum.js';
import {
  generateRandomValue,
  getRandomBoolean,
  getRandomItem,
  getRandomItems
} from '#utils/generate.js';

import { OfferGenerator } from './offer-generator.interface.js';
import {
  OfferGeneratorComments,
  OfferGeneratorGuests,
  OfferGeneratorPrice,
  OfferGeneratorRating,
  OfferGeneratorRooms,
  OfferGeneratorWeekDays
} from './tsv-offer-generator.enum.js';

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  generate(): string {
    const name = getRandomItem(this.mockData.names);
    const description = getRandomItem(this.mockData.descriptions);
    const publishAt = dayjs()
      .subtract(generateRandomValue(OfferGeneratorWeekDays.FIRST, OfferGeneratorWeekDays.LAST), 'day')
      .toISOString();
    const city = getRandomItem(this.mockData.cities);
    const previewImage = getRandomItem(this.mockData.images);
    const housingPhotos = getRandomItems(this.mockData.images).join(';');
    const isPremium = getRandomBoolean();
    const isFavorite = getRandomBoolean();
    const rating = generateRandomValue(OfferGeneratorRating.MIN, OfferGeneratorRating.MAX, OfferGeneratorRating.FRACTION_DIGITS);
    const housingType = getRandomItem(this.mockData.housingTypes);
    const roomsCount = generateRandomValue(OfferGeneratorRooms.MIN, OfferGeneratorRooms.MAX);
    const guestsCount = generateRandomValue(OfferGeneratorGuests.MIN, OfferGeneratorGuests.MAX);
    const rentalPrice = generateRandomValue(OfferGeneratorPrice.MIN, OfferGeneratorPrice.MAX);
    const improvements = getRandomItems(this.mockData.improvements).join(';');
    const email = getRandomItem(this.mockData.emails);
    const userName = getRandomItem(this.mockData.usernames);
    const avatarPath = getRandomItem(this.mockData.images);
    const accountType = getRandomItem([UserAccountType.COMMON, UserAccountType.PRO]);
    const commentsCount = generateRandomValue(OfferGeneratorComments.MIN, OfferGeneratorComments.MAX);
    const coordinates = getRandomItem(this.mockData.coordinates);

    return [
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
    ].join('\t');
  }
}

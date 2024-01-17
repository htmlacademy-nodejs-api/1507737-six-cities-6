import { User } from './user.js';

export enum HousingType {
  APARTMENT = 'apartment',
  HOUSE = 'house',
  ROOM = 'room',
  HOTEL = 'hotel'
}

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
  housingType: HousingType;
  roomsCount: number;
  guestsCount: number;
  rentalPrice: number;
  improvements: string[];
  author: User;
  commentsCount: number;
  coordinates: string;
}

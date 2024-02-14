import { OfferImporovements, OfferType } from '../types/offer.enum.js';
import { OfferCoordinate } from '../types/offer.types.js';

export class CreateOfferDto {
  public name!: string;
  public description!: string;
  public city!: string;
  public preview!:string;
  public housingPhotos!: string[];
  public isPremium!: boolean;
  public type!: OfferType;
  public roomsCount!: number;
  public guestsCount!: number;
  public rentalPrice!: number;
  public imrovements!: OfferImporovements[];
  public coordinate!: OfferCoordinate;
  public authorId!: string;
}

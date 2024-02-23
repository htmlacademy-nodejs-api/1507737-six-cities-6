import { OfferImporovements, OfferType } from '../types/offer.enum.js';
import { OfferLocation } from '../types/offer.types.js';

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
  public location!: OfferLocation;
  public authorId!: string;
}

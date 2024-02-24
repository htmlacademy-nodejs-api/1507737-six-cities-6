import { OfferCity, OfferImporovements, OfferType } from '../types/offer.enum.js';
import { OfferLocation } from '../types/offer.types.js';

export class EditOfferDto {
  public name!: string;
  public description!: string;
  public city!: OfferCity;
  public preview!:string;
  public isPremium!: boolean;
  public type!: OfferType;
  public rentalPrice!: number;
  public housingPhotos!: string[];
  public roomsCount!: number;
  public guestsCount!: number;
  public imrovements!: OfferImporovements[];
  public location!: OfferLocation;
  public userId!: string;
}

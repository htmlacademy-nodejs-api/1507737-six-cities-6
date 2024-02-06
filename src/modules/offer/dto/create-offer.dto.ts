import { OfferType } from '../types/offer.enum.js';

export class CreateOfferDto {
  public name!: string;
  public description!: string;
  public photo!: string;
  public type!: OfferType;
  public price!: number;
  public authorId!: string;
  public categoryId!: string;
}

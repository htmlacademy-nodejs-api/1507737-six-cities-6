import { readFileSync } from 'node:fs';
import { HousingType, Offer } from '../../shared/offer.js';
import { FileReader } from './reader.js';
import { toBoolean } from '../../utils/index.js';
import { UserAccountTypeEnum } from '../../shared/user.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([
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
      ]) => ({
        name,
        description,
        publishAt,
        city,
        previewImage,
        housingPhotos: housingPhotos.split(','),
        isPremium: toBoolean(isPremium),
        isFavorite: toBoolean(isFavorite),
        rating: Number.parseFloat(rating),
        housingType: housingType as HousingType,
        roomsCount: Number(roomsCount),
        guestsCount: Number(guestsCount),
        rentalPrice: Number.parseInt(rentalPrice, 10),
        improvements: improvements.split(','),
        author: {accountType: accountType as UserAccountTypeEnum, email, name: userName, avatarPath},
        commentsCount: Number(commentsCount),
        coordinates
      }));
  }
}

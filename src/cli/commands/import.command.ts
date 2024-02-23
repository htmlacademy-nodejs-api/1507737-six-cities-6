import { inject, injectable } from 'inversify';
import { Error } from 'mongoose';
import invariant from 'tiny-invariant';

import { RestAppConfig } from '../../lib/config/types/rest-config.types.js';
import type { MongoDB } from '../../lib/db/mongo.module.js';
import { TSVFileReader } from '../../lib/file-reader/tsv-file-reader.js';
import { OfferService } from '../../modules/offer/types/offer.service.interface.js';
import { UserService } from '../../modules/user/types/user.service.interface.js';
import { Component } from '../../types/component.enum.js';
import { MockOffer } from '../../types/mock.types.js';
import { getMongoURI } from '../../utils/common.js';
import { generatePassword } from '../../utils/generate.js';
import { createMockOffer } from '../../utils/mocks.js';
import { Command } from './command.interface.js';

@injectable()
export class ImportCommand implements Command {
  private salt!: string;

  constructor(
    @inject(Component.MongoDB) private readonly mongo: MongoDB,
    @inject(Component.Config) private readonly config: RestAppConfig,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);
  }

  getName(): string {
    return '--import';
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const offer = createMockOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
    this.mongo.disconnect();
  }

  private async saveOffer(offer: MockOffer) {
    const user = await this.userService.create({
      ...offer.author,
      password: generatePassword()
    }, this.salt);

    await this.offerService.create({
      authorId: user.id,
      city: offer.city,
      location: offer.coordinate,
      description: offer.description,
      guestsCount: offer.guestsCount,
      housingPhotos: offer.housingPhotos,
      imrovements: offer.improvements,
      name: offer.name,
      preview: offer.preview,
      rentalPrice: offer.rentalPrice,
      type: offer.type,
      roomsCount: offer.roomsCount,
      isPremium: offer.isPremium,
    });
  }

  async execute(
    filename: string,
    dbUser: string = this.config.get('DB_USER'),
    dbPassword: string = this.config.get('DB_PASSWORD'),
    dbHost: string = this.config.get('DB_HOST'),
    dnPort: string = this.config.get('DB_PORT'),
    dbName: string = this.config.get('DB_NAME'),
    salt: string = this.config.get('SALT')
  ) {

    invariant(filename, 'filename is required');
    invariant(dbUser, 'dbUser is required');
    invariant(dbPassword, 'dbPassword is required');
    invariant(dbHost, 'dbHost is required');
    invariant(dnPort, 'dnPort is required');
    invariant(dbName, 'dbName is required');
    invariant(salt, 'salt is required');

    this.salt = salt;
    const mongoUri = getMongoURI(
      dbUser,
      dbPassword,
      dbHost,
      dnPort,
      dbName,
    );

    await this.mongo.connect(mongoUri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      fileReader.read();
    } catch (err) {

      if (!(err instanceof Error)) {
        throw err;
      }

      console.error(`Can't import data from file: ${filename}`);
      console.error(`Details: ${err.message}`);
    }
  }
}

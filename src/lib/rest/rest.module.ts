import { inject, injectable } from 'inversify';

import { OfferService } from '../../modules/offer/types/offer.service.interface.js';
import { Component } from '../../types/component.enum.js';
import { getMongoURI } from '../../utils/common.js';
import type { RestAppConfig } from '../config/types/rest-config.types.js';
import { MongoDB } from '../db/mongo.module.js';
import type { Logger } from '../logger/types/logger.interface.js';


@injectable()
export class RestApp {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.MongoDB) private readonly mongo: MongoDB,
    @inject(Component.Config) private readonly config: RestAppConfig,
    @inject(Component.OfferService) private readonly offerService: OfferService
  ) {}

  private async initDb() {
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    return this.mongo.connect(mongoUri);
  }

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info('Init database…');
    await this.initDb();
    this.logger.info('Init database completed');


    const r = await this.offerService.findFavorites();
    console.log('r: ', r);
  }
}


import { inject, injectable } from 'inversify';

import { RestAppConfig } from '#modules/config/index.js';
import { MongoDB } from '#modules/db/mongo.module.js';
import { Logger } from '#modules/logger/index.js';
import { Component } from '#types/component.enum.js';
import { getMongoURI } from '#utils/common.js';

@injectable()
export class RestApp {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.MongoDB) private readonly mongo: MongoDB,
    @inject(Component.Config) private readonly config: RestAppConfig,
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
  }
}


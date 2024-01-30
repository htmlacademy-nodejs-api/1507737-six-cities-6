import { inject, injectable } from 'inversify';

import { RestAppConfig } from '#config/index.js';
import { Logger } from '#lib/logger.js';
import { Component } from '#shared/enums.js';

@injectable()
export class RestApp {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: RestAppConfig,
  ) {}

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
  }
}

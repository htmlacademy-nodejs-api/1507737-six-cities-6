import { inject, injectable } from 'inversify';

import { RestAppConfig } from '#config/rest/index.js';
import { Logger } from '#lib/logger/index.js';
import { Component } from '#types/component.enum.js';

@injectable()
export class RestApp {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: RestAppConfig,
  ) {}

  public init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
  }
}

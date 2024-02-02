import { inject, injectable } from 'inversify';

import { Logger } from '#modules/logger/index.js';
import { Component } from '#types/component.enum.js';

@injectable()
export class RestApp {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
  ) {}

  public init() {
    this.logger.info('Application initialization');
  }
}

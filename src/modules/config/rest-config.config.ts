import { config } from 'dotenv';
import { inject, injectable } from 'inversify';

import { Logger } from '#modules/logger/index.js';
import { Component } from '#types/component.enum.js';

import { configRestSchema } from './rest-config.schema.js';
import { RestAppConfig, RestSchema } from './types/rest-config.types.js';

@injectable()
export class RestConfig implements RestAppConfig {
  private readonly config: RestSchema;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
    if (config().error) {
      throw new Error('Can\'t read .env file. Perhaps the file does not exists.');
    }

    configRestSchema
      .load({})
      .validate({ allowed: 'strict', output: this.logger.info });

    this.config = configRestSchema.getProperties();
    this.logger.info('.env file found and successfully parsed!');
  }

  public get<T extends keyof RestSchema>(key: T): RestSchema[T] {
    return this.config[key];
  }
}

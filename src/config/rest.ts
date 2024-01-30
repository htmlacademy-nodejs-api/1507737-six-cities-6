import { config } from 'dotenv';
import { inject, injectable } from 'inversify';

import { Logger } from '#lib/logger.js';
import { Component } from '#shared/enums.js';

import { configRestSchema, RestAppConfig, RestSchema } from './rest-schema.js';

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

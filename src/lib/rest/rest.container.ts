import { Container } from 'inversify';

import { Component } from '../../types/component.enum.js';
import { RestConfig } from '../config/rest-config.config.js';
import { RestAppConfig } from '../config/types/rest-config.types.js';
import { DBClient } from '../db/db.interface.js';
import { MongoDB } from '../db/mongo.module.js';
import { PinoLogger } from '../logger/pino.logger.js';
import { Logger } from '../logger/types/logger.interface.js';
import { RestApp } from './rest.module.js';

export function createRestAppContainer() {
  const restApplicationContainer = new Container();

  restApplicationContainer.bind<RestApp>(Component.RestApp).to(RestApp).inSingletonScope();
  restApplicationContainer.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  restApplicationContainer.bind<RestAppConfig>(Component.Config).to(RestConfig).inSingletonScope();
  restApplicationContainer.bind<DBClient>(Component.MongoDB).to(MongoDB).inSingletonScope();

  return restApplicationContainer;
}

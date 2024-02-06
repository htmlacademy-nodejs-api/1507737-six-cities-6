import { Container } from 'inversify';

import { RestAppConfig, RestConfig } from '#modules/config/index.js';
import { DBClient } from '#modules/db/db.interface.js';
import { MongoDB } from '#modules/db/mongo.module.js';
import { Logger, PinoLogger } from '#modules/logger/index.js';
import { Component } from '#types/component.enum.js';

import { RestApp } from './rest.module.js';

export function createRestAppContainer() {
  const restApplicationContainer = new Container();

  restApplicationContainer.bind<RestApp>(Component.RestApp).to(RestApp).inSingletonScope();
  restApplicationContainer.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  restApplicationContainer.bind<RestAppConfig>(Component.Config).to(RestConfig).inSingletonScope();
  restApplicationContainer.bind<DBClient>(Component.MongoDB).to(MongoDB).inSingletonScope();

  return restApplicationContainer;
}

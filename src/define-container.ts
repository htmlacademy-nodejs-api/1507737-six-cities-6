import { Container } from 'inversify';

import { RestAppConfig,RestConfig} from '#config/rest/index.js';
import { Logger, PinoLogger } from '#lib/logger.js';
import { RestApp } from '#rest/app.js';
import { Component } from '#shared/enums.js';

export function defineContainer() {
  const container = new Container();
  container.bind<RestApp>(Component.RestApp).to(RestApp).inSingletonScope();
  container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<RestAppConfig>(Component.Config).to(RestConfig).inSingletonScope();

  return {
    app: container.get<RestApp>(Component.RestApp)
  };
}

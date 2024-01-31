import { Container } from 'inversify';

import { RestAppConfig,RestConfig} from '#config/rest/index.js';
import { Logger, PinoLogger } from '#lib/logger/index.js';
import { RestApp } from '#rest/index.js';
import { Component } from '#types/component.enum.js';

export function defineContainer() {
  const container = new Container();
  container.bind<RestApp>(Component.RestApp).to(RestApp).inSingletonScope();
  container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<RestAppConfig>(Component.Config).to(RestConfig).inSingletonScope();

  return {
    app: container.get<RestApp>(Component.RestApp)
  };
}

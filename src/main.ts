import 'reflect-metadata';

import { Container } from 'inversify';

import { RestConfig } from '#config/rest.js';
import { RestAppConfig } from '#config/rest-schema.js';
import { Logger, PinoLogger } from '#lib/logger.js';
import { RestApp } from '#rest/app.js';
import { Component } from '#shared/enums.js';

async function bootstrap() {
  const container = new Container();
  container.bind<RestApp>(Component.RestApp).to(RestApp).inSingletonScope();
  container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<RestAppConfig>(Component.Config).to(RestConfig).inSingletonScope();

  const application = container.get<RestApp>(Component.RestApp);
  await application.init();

}

bootstrap();

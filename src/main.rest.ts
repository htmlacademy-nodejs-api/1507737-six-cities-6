import 'reflect-metadata';

import { getRootContainer } from '#root-container.js';

async function bootstrap() {
  const app = getRootContainer();
  app.init();
}

bootstrap();

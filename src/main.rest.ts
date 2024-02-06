import 'reflect-metadata';

import { defineRootContainer } from '#define-root-container.js';

async function bootstrap() {
  const {app} = defineRootContainer();
  app.init();
}

bootstrap();

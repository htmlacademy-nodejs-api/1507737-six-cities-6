import 'reflect-metadata';

import { defineContainer } from '#define-container.js';

async function bootstrap() {
  const {app} = defineContainer();
  app.init();
}

bootstrap();

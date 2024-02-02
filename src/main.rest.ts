import 'reflect-metadata';

import { defineContainers } from '#define-containers.js';

async function bootstrap() {
  const {app} = defineContainers();
  app.init();
}

bootstrap();

import { Container } from 'inversify';

import { createCLIContainer } from './cli/commands/command.container.js';
import { createRestAppContainer } from './lib/rest/rest.container.js';
import { RestApp } from './lib/rest/rest.module.js';
import { createCommentContainer } from './modules/comment/comment.container.js';
import { createOfferContainer } from './modules/offer/offer.container.js';
import { createUserContainer } from './modules/user/user.container.js';
import { Component } from './types/component.enum.js';

export function defineRootContainer() {
  const rootContainer = Container.merge(
    createRestAppContainer(),
    createOfferContainer(),
    createUserContainer(),
    createCommentContainer(),
    createCLIContainer()
  );

  return rootContainer;
}

export function getRootContainer() {
  const rootContainer = defineRootContainer();
  return rootContainer.get<RestApp>(Component.RestApp);
}

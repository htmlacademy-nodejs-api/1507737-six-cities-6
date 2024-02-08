import { Container } from 'inversify';

import { createCLIContainer } from '#cli/commands/command.container.js';
import { createCommentContainer } from '#modules/comment/index.js';
import { createOfferContainer } from '#modules/offer/offer.container.js';
import { RestApp } from '#modules/rest/index.js';
import { createRestAppContainer } from '#modules/rest/rest.container.js';
import { createUserContainer } from '#modules/user/index.js';
import { Component } from '#types/component.enum.js';

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

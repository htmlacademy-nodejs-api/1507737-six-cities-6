import { Container } from 'inversify';

import { createCategoryContainer } from '#modules/category/category.container.js';
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
    createCategoryContainer(),
  );

  return {
    app: rootContainer.get<RestApp>(Component.RestApp)
  };
}

import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';

import { Component } from '#types/component.enum.js';

import { CategoryEntity } from './category.entity.js';
import { CategoryModel } from './category.model.js';
import { CategoryServiceImpl } from './category.service.js';
import { CategoryService } from './types/category.service.interface.js';


export function createCategoryContainer() {
  const container = new Container();

  container.bind<CategoryService>(Component.CategoryService).to(CategoryServiceImpl);
  container.bind<types.ModelType<CategoryEntity>>(Component.UserModel).toConstantValue(CategoryModel);

  return container;
}

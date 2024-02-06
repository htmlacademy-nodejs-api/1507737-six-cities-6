import { types } from '@typegoose/typegoose';
import { inject } from 'inversify';

import { Component } from '#types/component.enum.js';

import { INITIAL_CATEGORIES } from './category.constants.js';
import { CategoryEntity } from './category.entity.js';
import { CategoryService } from './types/category.service.interface.js';

export class CategoryServiceImpl implements CategoryService {
  constructor(
    @inject(Component.CategoryModel) private readonly categoryModel: types.ModelType<CategoryEntity>,
  ) {}

  public async createMany() {
    const category = await this.categoryModel.insertMany(this.getDefaultCategories());
    return category;
  }

  private getDefaultCategories() {
    return INITIAL_CATEGORIES;
  }
}

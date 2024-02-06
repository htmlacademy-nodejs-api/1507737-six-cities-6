import { DocumentType } from '@typegoose/typegoose';

import { CategoryEntity } from '../category.entity.js';

export interface CategoryService {
  createMany(): Promise<DocumentType<CategoryEntity>[]>
}

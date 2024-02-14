import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';

import { Component } from '../../types/component.enum.js';
import { CommentModel } from '../models.js';
import { CommentEntity } from './comment.entity.js';
import { CommentServiceImpl } from './comment.service.js';
import { CommentService } from './types/comment.service.interface.js';

export function createCommentContainer() {
  const container = new Container();

  container.bind<CommentService>(Component.CommentService).to(CommentServiceImpl);
  container.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);

  return container;
}

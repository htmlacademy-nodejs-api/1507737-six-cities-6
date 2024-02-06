import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';

import { Component } from '#types/component.enum.js';

import { CommentEntity } from './comment.entity.js';
import { CommentModel } from './comment.model.js';
import { CommentServiceImpl } from './comment.service.js';
import { CommentService } from './types/comment.service.interface.js';

export function createCommentContainer() {
  const container = new Container();

  container.bind<CommentService>(Component.CommentService).to(CommentServiceImpl);
  container.bind<types.ModelType<CommentEntity>>(Component.UserModel).toConstantValue(CommentModel);

  return container;
}

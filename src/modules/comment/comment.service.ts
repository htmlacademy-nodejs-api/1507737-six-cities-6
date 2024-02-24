import { types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';

import { Logger } from '../../lib/logger/types/logger.interface.js';
import { Component } from '../../types/component.enum.js';
import { CommentEntity } from './comment.entity.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { CommentService } from './types/comment.service.interface.js';

@injectable()
export class CommentServiceImpl implements CommentService {
  constructor(
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>,
    @inject(Component.Logger) private readonly logger: Logger,
  ) {}

  public async create(dto: CreateCommentDto) {
    const comment = await this.commentModel.create(dto);
    this.logger.info(`new user created: ${comment.id}`);
    return comment;
  }

  public async findByOfferId(offerId: string) {
    return this.commentModel.find({ offer: offerId }).exec();
  }
}

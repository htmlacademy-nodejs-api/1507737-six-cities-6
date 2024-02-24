import { DocumentType } from '@typegoose/typegoose';

import { CreateOfferDto } from '../dto/create-offer.dto.js';
import { EditOfferDto } from '../dto/edit-offer.dto.js';
import { OfferEntity } from '../offer.entity.js';

export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>
  edit(dto: EditOfferDto, offerId: string): Promise<DocumentType<OfferEntity> | null>
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>
  find(): Promise<DocumentType<OfferEntity>[]>
  findFavorites(): Promise<DocumentType<OfferEntity>[]>
  incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null>
}

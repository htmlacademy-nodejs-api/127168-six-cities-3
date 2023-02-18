import { DocumentType } from '@typegoose/typegoose';
import CreateFavoriteOfferDTO from './dto/create-favorite-offer.dto.js';
import { FavoriteOfferEntity } from './favorite-offer.entity.js';

export interface FavoriteOfferServiceInterface {
  create(dto: CreateFavoriteOfferDTO): Promise<DocumentType<FavoriteOfferEntity>>;
}

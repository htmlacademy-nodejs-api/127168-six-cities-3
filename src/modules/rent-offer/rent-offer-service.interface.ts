import CreateRentOfferDTO from './dto/create-rent-offer.dto.js';
import { DocumentType } from '@typegoose/typegoose';
import { RentOfferEntity } from './rent-offer.entity.js';


export interface RentOfferServiceInterface {
  create(dto: CreateRentOfferDTO): Promise<DocumentType<RentOfferEntity>>;
  findById(offerId: string): Promise<DocumentType<RentOfferEntity> | null>;
  find(count?: number): Promise<DocumentType<RentOfferEntity>[]>;
  findPremium(): Promise<DocumentType<RentOfferEntity>[]>;
  findFavorite(): Promise<DocumentType<RentOfferEntity>[]>;
  deleteById(offerId: string): Promise<DocumentType<RentOfferEntity> | null>;
  updateById(offerId: string, dto: CreateRentOfferDTO): Promise<DocumentType<RentOfferEntity> | null>;
  updateCommentCountAndRating(offerId: string, newRate: number): Promise<DocumentType<RentOfferEntity> | null>;
  exists(documentId: string): Promise<boolean>;
}

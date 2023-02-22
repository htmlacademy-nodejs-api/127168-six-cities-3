import { DocumentType } from '@typegoose/typegoose';
import { RentOfferEntity } from '../modules/rent-offer/rent-offer.entity.js';

export interface DocumentFinderInterface {
  findById(offerId: string): Promise<DocumentType<RentOfferEntity> | null>;
}

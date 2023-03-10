import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/component.types.js';
import CreateFavoriteOfferDTO from './dto/create-favorite-offer.dto.js';
import { FavoriteOfferServiceInterface } from './favorite-offer-service.interface.js';
import { FavoriteOfferEntity } from './favorite-offer.entity.js';

@injectable()
export default class FavoriteOfferService implements FavoriteOfferServiceInterface {
  constructor(
    @inject(Component.FavoriteOfferModel) private readonly favoriteOfferModel: types.ModelType<FavoriteOfferEntity>
  ) {}

  public async create(dto: CreateFavoriteOfferDTO): Promise<DocumentType<FavoriteOfferEntity>> {
    return this.favoriteOfferModel.create(dto);
  }

  public async delete(dto: CreateFavoriteOfferDTO): Promise<DocumentType<FavoriteOfferEntity> | null> {
    return this.favoriteOfferModel
      .findOneAndDelete(dto)
      .exec();
  }

  public async exists(userId: string, offerId: string): Promise<boolean> {
    return (await this.favoriteOfferModel
      .exists({userId, offerId})) !== null;
  }
}

import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/component.types.js';
import CreateRentOfferDTO from './dto/create-rent-offer.dto.js';
import { RentOfferServiceInterface } from './rent-offer-service.interface.js';
import { RentOfferEntity } from './rent-offer.entity.js';

@injectable()
export default class RentOfferService implements RentOfferServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.RentOfferModel) private readonly rentOfferModel: types.ModelType<RentOfferEntity>
  ) {}

  public async create(dto: CreateRentOfferDTO): Promise<DocumentType<RentOfferEntity>> {
    const result = await this.rentOfferModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<RentOfferEntity> | null> {
    return this.rentOfferModel
      .findById(offerId)
      .populate(['userId'])
      .exec();
  }
}

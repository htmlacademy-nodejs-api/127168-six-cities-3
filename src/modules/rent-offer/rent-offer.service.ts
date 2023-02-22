import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/component.types.js';
import { SortType } from '../../types/sort-type.enum.js';
import CreateRentOfferDTO from './dto/create-rent-offer.dto.js';
import UpdateRentOfferDTO from './dto/update-rent-offer.dto.js';
import { RentOfferServiceInterface } from './rent-offer-service.interface.js';
import { OfferCounts } from './rent-offer.constant.js';
import { RentOfferEntity } from './rent-offer.entity.js';

@injectable()
export default class RentOfferService implements RentOfferServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.RentOfferModel) private readonly rentOfferModel: types.ModelType<RentOfferEntity>
  ) {}

  public async create(dto: CreateRentOfferDTO): Promise<DocumentType<RentOfferEntity>> {
    const createdOffer = await this.rentOfferModel.create(dto);
    const result = await createdOffer.populate(['userId']);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<RentOfferEntity> | null> {
    return this.rentOfferModel
      .findById(offerId)
      .populate(['userId'])
      .exec();
  }

  public async find(count?: number): Promise<DocumentType<RentOfferEntity>[]> {
    return this.rentOfferModel
      .find()
      .sort({createdAt: SortType.Down})
      .limit(count || OfferCounts.DefaultRentOfferCount)
      .populate(['userId'])
      .exec();
  }

  public async findPremium(): Promise<DocumentType<RentOfferEntity>[]> {
    return this.rentOfferModel
      .find({premium: true})
      .sort({createdAt: SortType.Down})
      .limit(OfferCounts.PremiumCount)
      .populate(['userId'])
      .exec();
  }

  public async findFavorite(): Promise<DocumentType<RentOfferEntity>[]> {
    return this.rentOfferModel
      .find({favorite: true})
      .populate(['userId'])
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<RentOfferEntity> | null> {
    return this.rentOfferModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateRentOfferDTO): Promise<DocumentType<RentOfferEntity> | null> {
    return this.rentOfferModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate(['userId'])
      .exec();
  }

  public async updateCommentCountAndRating(offerId: string, newRate: number): Promise<DocumentType<RentOfferEntity> | null> {
    return this.rentOfferModel
      .findByIdAndUpdate(offerId,
        {$inc: {
          numComments: 1,
          rating: newRate
        }, // TODO - поправить этот момент
        },
        {new: true}
      ).exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.rentOfferModel
      .exists({_id: documentId})) !== null;
  }
}

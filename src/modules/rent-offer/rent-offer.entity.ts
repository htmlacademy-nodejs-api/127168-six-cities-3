import { City } from '../../types/city.enum.js';
import {
  GuestsInterval,
  PriceInterval,
  RatingInterval,
  RoomsInterval
} from '../../common/rent-offer-generator/rent-offer-generator.const.js';
import { PropertyType } from '../../types/property-type.enum.js';
import typegoose, {
  defaultClasses,
  getModelForClass,
  Ref
} from '@typegoose/typegoose';
import { UserEntity } from '../user/user.entity.js';

const {prop, modelOptions} = typegoose;

export interface RentOfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'rent-offers'
  }
})
export class RentOfferEntity extends defaultClasses.TimeStamps {
  @prop({
    trim: true,
    required: true
  })
  public title!: string;

  @prop({
    trim: true,
    required: true
  })
  public description!: string;

  @prop({required: true})
  public postDate!: Date;

  @prop({
    required: true,
    enum: City
  })
  public city!: City;

  @prop({required: true})
  public preview!: string;

  @prop({required: true})
  public photos!: string[];

  @prop({required: true})
  public premium!: boolean;

  @prop({required: true})
  public favorite!: boolean;

  @prop({
    required: true,
    min: RatingInterval.MinRating,
    max: RatingInterval.MaxRating,
  })
  public rating!: number;

  @prop({
    required: true,
    enum: PropertyType
  })
  public propertyType!: PropertyType;

  @prop({
    required: true,
    min: RoomsInterval.MinRooms,
    max: RoomsInterval.MaxRooms,
  })
  public numRooms!: number;

  @prop({
    required: true,
    min: GuestsInterval.MinGuests,
    max: GuestsInterval.MaxGuests,
  })
  public numGuests!: number;

  @prop({
    required: true,
    min: PriceInterval.MinPrice,
    max: PriceInterval.MaxPrice,
  })
  public price!: number;

  @prop({required: true})
  public amenities!: string[];

  @prop({default: 0})
  public numComments!: number;

  @prop({required: true})
  public coordinates!: [number, number];

  @prop({
    required: true,
    ref: UserEntity
  })
  public userId!: Ref<UserEntity>;
}

export const RentOfferModel = getModelForClass(RentOfferEntity);

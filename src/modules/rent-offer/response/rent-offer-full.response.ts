import { Expose, Type } from 'class-transformer';
import { City } from '../../../types/city.enum.js';
import { PropertyType } from '../../../types/property-type.enum.js';
import UserResponse from '../../user/response/user.response.js';

export default class RentOfferFullResponse {
  @Expose({name: 'id'})
  public offerId!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public city!: City;

  @Expose()
  public coordinates!: [number, number];

  @Expose()
  public propertyType!: PropertyType;

  @Expose()
  public price!: number;

  @Expose()
  public rating!: number;

  @Expose()
  public preview!: string;

  @Expose()
  public photos!: string[];

  @Expose()
  public numRooms!: number;

  @Expose()
  public numGuests!: number;

  @Expose()
  public amenities!: string[];

  @Expose({name: 'createdAt'})
  public postDate!: Date;

  @Expose()
  public premium!: boolean;

  @Expose()
  public favorite!: boolean;

  @Expose()
  public numComments!: number;

  @Expose({name: 'userId'})
  @Type(() => UserResponse)
  public user!: UserResponse;
}

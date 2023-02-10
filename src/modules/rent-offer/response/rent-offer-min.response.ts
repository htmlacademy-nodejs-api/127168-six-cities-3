import { Expose } from 'class-transformer';
import { City } from '../../../types/city.enum.js';
import { PropertyType } from '../../../types/property-type.enum.js';

export default class RentOfferMinResponse {
  @Expose({name: 'id'})
  public offerId!: string;

  @Expose()
  public title!: string;

  @Expose()
  public city!: City;

  @Expose()
  public propertyType!: PropertyType;

  @Expose()
  public price!: number;

  @Expose()
  public rating!: number;

  @Expose()
  public preview!: string;

  @Expose({name: 'createdAt'})
  public postDate!: Date;

  @Expose()
  public premium!: boolean;

  @Expose()
  public favorite!: boolean;

  @Expose()
  public numComments!: number;
}

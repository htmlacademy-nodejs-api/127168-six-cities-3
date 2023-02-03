import { Expose } from 'class-transformer';
import { City } from '../../../types/city.enum.js';
import { PropertyType } from '../../../types/property-type.enum.js';

export default class RentOfferMinResponse {
  @Expose()
  public _id!: string; // TODO - заменить имя на offerId (почему-то id постоянно меняется, пофиксить позже)

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

  @Expose()
  public postDate!: Date; // TODO - заменить потом на createdAt

  @Expose()
  public premium!: boolean;

  @Expose()
  public favorite!: boolean;

  @Expose()
  public numComments!: number;
}

import { City } from '../../../types/city.enum.js';
import { PropertyType } from '../../../types/property-type.enum.js';

export default class CreateRentOfferDTO {
  public title!: string;
  public description!: string;
  public city!: City;
  public coordinates!: [number, number];
  public propertyType!: PropertyType;
  public price!: number;
  public rating!: number;
  public preview!: string;
  public photos!: string[];
  public numRooms!: number;
  public numGuests!: number;
  public amenities!: string[];
  public postDate!: Date;
  public premium!: boolean;
  public favorite!: boolean;
  public numComments!: number;
  public userId!: string;
}

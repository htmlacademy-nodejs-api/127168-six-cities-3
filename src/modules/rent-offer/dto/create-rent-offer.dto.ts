import { City } from '../../../types/city.enum.js';
import { PropertyType } from '../../../types/property-type.enum.js';

export default class CreateRentOfferDTO {
  public title!: string;
  public description!: string;
  public postDate!: Date;
  public city!: City;
  public preview!: string;
  public photos!: string[];
  public premium!: boolean;
  public favorite!: boolean;
  public rating!: number;
  public propertyType!: PropertyType;
  public numRooms!: number;
  public numGuests!: number;
  public price!: number;
  public amenities!: string[];
  public numComments!: number;
  public coordinates!: [number, number];
  public userId!: string;
}

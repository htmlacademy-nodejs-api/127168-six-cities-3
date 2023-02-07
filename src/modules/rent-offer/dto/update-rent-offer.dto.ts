import { City } from '../../../types/city.enum.js';
import { PropertyType } from '../../../types/property-type.enum.js';

export default class UpdateRentOfferDTO {
  public title?: string;
  public description?: string;
  public city?: City;
  public coordinates?: [number, number];
  public propertyType?: PropertyType;
  public price?: number;
  public rating?: number; // TODO - убрать при отладке
  public preview?: string;
  public photos?: string[];
  public numRooms?: number;
  public numGuests?: number;
  public amenities?: string[];
  public postDate?: Date; // TODO - убрать при отладке
  public premium?: boolean;
  public favorite?: boolean;
  public numComments?: number; // TODO - убрать при отладке
  public userId?: string;
}

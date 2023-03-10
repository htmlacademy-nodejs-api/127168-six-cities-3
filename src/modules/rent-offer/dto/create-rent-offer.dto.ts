import { IsArray, IsBoolean, IsEnum, Max, MaxLength, Min, MinLength } from 'class-validator';
import { Amenities } from '../../../types/amenities.enum.js';
import { City } from '../../../types/city.enum.js';
import { PropertyType } from '../../../types/property-type.enum.js';

export default class CreateRentOfferDTO {
  @MinLength(10, {message: 'Minimum title length must be 10'})
  @MaxLength(100, {message: 'Maximum title length must be 100'})
  public title!: string;

  @MinLength(20, {message: 'Minimum description length must be 20'})
  @MaxLength(1024, {message: 'Maximum description length must be 1024'})
  public description!: string;

  @IsEnum(City, {message: 'City must be one of the six represented'})
  public city!: City;

  public coordinates!: [number, number];

  @IsEnum(PropertyType, {message: 'propertyType must be Apartment, House, Room or Hotel'})
  public propertyType!: PropertyType;

  @Min(100, {message: 'Minimum price is 100'})
  @Max(100000, {message: 'Maximum price is 100000'})
  public price!: number;

  @Min(1, {message: 'Minimum rooms is 1'})
  @Max(8, {message: 'Maximum rooms is 8'})
  public numRooms!: number;

  @Min(1, {message: 'Minimum guests is 1'})
  @Max(10, {message: 'Maximum guests is 10'})
  public numGuests!: number;

  @IsArray({message: 'Field amenities must be an array'})
  @IsEnum(Amenities, {each: true})
  public amenities!: string[];

  @IsBoolean()
  public premium!: boolean;

  public userId!: string;
}

import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsDateString, IsEnum, IsNumber, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
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

  @IsArray({message: 'Field coordinates must be an array'})
  @ArrayMinSize(2, {message: 'Array "coordinates" must have only 2 elements'})
  @ArrayMaxSize(2, {message: 'Array "coordinates" must have only 2 elements'})
  @IsNumber({}, {each: true})
  public coordinates!: number[];

  @IsEnum(PropertyType, {message: 'propertyType must be Apartment, House, Room or Hotel'})
  public propertyType!: PropertyType;

  @Min(100, {message: 'Minimum price is 100'})
  @Max(100000, {message: 'Maximum price is 100000'})
  public price!: number;

  @Min(1, {message: 'Minimum rating is 1'})
  @Max(5, {message: 'Maximum rating is 5'})
  public rating!: number; // TODO - убрать при отладке, сейчас оставляем, чтобы не сломалось

  @IsString({message: 'preview must be string'})
  public preview!: string;

  @IsArray({message: 'Field photos must be an array'})
  @ArrayMinSize(6, {message: 'Array "photos" must have only 6 elements'})
  @ArrayMaxSize(6, {message: 'Array "photos" must have only 6 elements'})
  @IsString({each: true, message: 'All elements must be string'})
  public photos!: string[];

  @Min(1, {message: 'Minimum rooms is 1'})
  @Max(8, {message: 'Maximum rooms is 8'})
  public numRooms!: number;

  @Min(1, {message: 'Minimum guests is 1'})
  @Max(10, {message: 'Maximum guests is 10'})
  public numGuests!: number;

  @IsArray({message: 'Field amenities must be an array'})
  @IsEnum(Amenities, {each: true})
  public amenities!: string[];

  @IsDateString({}, {message: 'postDate must be valid ISO date'})
  public postDate!: Date; // TODO - убрать при отладке, сейчас оставляем, чтобы не сломалось

  @IsBoolean()
  public premium!: boolean;

  @IsBoolean()
  public favorite!: boolean; // TODO - убрать при отладке, сейчас оставляем, чтобы не сломалось

  @IsNumber()
  public numComments!: number; // TODO - убрать при отладке, сейчас оставляем, чтобы не сломалось

  public userId!: string;
}

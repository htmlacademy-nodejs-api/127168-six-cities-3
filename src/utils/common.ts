import { Amenities } from '../types/amenities.enum.js';
import { City } from '../types/city.enum.js';
import crypto from 'crypto';
import { PropertyType } from '../types/property-type.enum.js';
import { UserStatus } from '../types/user-status.enum.js';
import { RentOffer } from '../types/rent-offer.type.js';
import { ClassConstructor, plainToInstance } from 'class-transformer';

export const createRentOffer = (row: string): RentOffer => {
  const tokens = row.replace('\n', '').split('\t');
  const [
    title, description, postDate, city, preview,
    photos, premium, favorite, rating, propertyType,
    numRooms, numGuests, price, amenities, numComments,
    coordinates, username, email, avatar, password, userStatus
  ] = tokens;

  return {
    title,
    description,
    postDate: new Date(postDate),
    city: City[city as keyof typeof City],
    preview,
    photos: photos.split(';'),
    premium: JSON.parse(premium),
    favorite: JSON.parse(favorite),
    rating: Number.parseFloat(String(rating)),
    propertyType: PropertyType[propertyType as keyof typeof PropertyType],
    numRooms: Number.parseInt(numRooms, 10),
    numGuests: Number.parseInt(numGuests, 10),
    price: Number.parseInt(price, 10),
    amenities: amenities.split(';').map((amenitie) => Amenities[amenitie as keyof typeof Amenities]),
    numComments: Number.parseInt(numComments, 10),
    coordinates: [
      Number.parseFloat(coordinates.split(';')[0]),
      Number.parseFloat(coordinates.split(';')[1])
    ],
    user: {
      username,
      email,
      avatar,
      password,
      userStatus: UserStatus[userStatus as keyof typeof UserStatus],
    }
  };
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};

export const fillDTO = <T, V>(someDTO: ClassConstructor<T>, plainObject: V) =>
  plainToInstance(someDTO, plainObject, {excludeExtraneousValues: true});

export const createErrorObject = (message: string) => ({
  error: message,
});

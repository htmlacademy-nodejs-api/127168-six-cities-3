import { Amenities } from './amenities.enum.js';
import { City } from './city.enum.js';
import { PropertyType } from './property-type.enum.js';
import { User } from './user.type.js';

export type RentOffer = {
  title: string;
  description: string;
  city: City;
  preview: string;
  photos: string[];
  premium: boolean;
  rating: number;
  propertyType: PropertyType;
  numRooms: number;
  numGuests: number;
  price: number;
  amenities: Amenities[];
  numComments: number;
  coordinates: [number, number];
  user: User;
}

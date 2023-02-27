import {
  CityCoordinates,
  CommentsInterval,
  GuestsInterval,
  PriceInterval,
  RatingInterval,
  RoomsInterval
} from './rent-offer-generator.const.js';
import { convertNumWithPads } from '../../utils/converting.js';
import {
  generateRandomDecimal,
  getRandomBoolean,
  getRandomItem,
  getRandomItems
} from '../../utils/random.js';
import { MockData } from '../../types/mock-data.type.js';
import { RentOfferGeneratorInterface } from './rent-offer-generator.interface.js';
import { UserStatus } from '../../types/user-status.enum.js';

const NUM_AFTER_DIGIT = 1;
const NUM_PHOTOS = 6;
const NUM_PADS = 3;

export default class RentOfferGenerator implements RentOfferGeneratorInterface {
  constructor (
    private readonly mockData: MockData,
  ) {}

  generate (counter: number): string {
    const offerNumber = convertNumWithPads(counter, NUM_PADS);

    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const city = getRandomItem<string>(this.mockData.cities);
    const preview = `preview${offerNumber}.jpg`;
    const photos = Array.from(
      {length: NUM_PHOTOS},
      (_item, index) =>
        `photo${offerNumber}-${convertNumWithPads(index, NUM_PADS)}.jpg`
    ).join(';');
    const premium = getRandomBoolean().toString();
    const rating = generateRandomDecimal(RatingInterval.MinRating, RatingInterval.MaxRating, NUM_AFTER_DIGIT).toString();
    const propertyType = getRandomItem<string>(this.mockData.propertyTypes);
    const numRooms = generateRandomDecimal(RoomsInterval.MinRooms, RoomsInterval.MaxRooms).toString();
    const numGuests = generateRandomDecimal(GuestsInterval.MinGuests, GuestsInterval.MaxGuests).toString();
    const price = generateRandomDecimal(PriceInterval.MinPrice, PriceInterval.MaxPrice).toString();
    const amenities = getRandomItems<string>(this.mockData.amenities).join(';');
    const numComments = generateRandomDecimal(CommentsInterval.MinComments, CommentsInterval.MaxComments).toString();
    const coordinates = CityCoordinates[city as keyof typeof CityCoordinates].join(';');
    const username = getRandomItem<string>(this.mockData.usernames);
    const email = `${username.replace(/\s/g,'').toLowerCase()}${getRandomItem<string>(this.mockData.emails)}`;
    const avatar = `avatar${offerNumber}.jpg`;
    const password = getRandomItem<string>(this.mockData.passwords);
    const userStatus = getRandomItem<string>([UserStatus.Standart, UserStatus.Pro]);

    return [
      title, description, city, preview,
      photos, premium, rating, propertyType,
      numRooms, numGuests, price, amenities, numComments,
      coordinates, username, email, avatar, password, userStatus
    ].join('\t');
  }
}

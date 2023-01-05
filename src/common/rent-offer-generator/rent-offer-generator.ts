import {
  CityCoordinates,
  CommentsInterval,
  DaysInterval,
  GuestsInterval,
  PriceInterval,
  RatingInterval,
  RoomsInterval
} from './rent-offer-generator.const.js';
import { convertNumWithPads } from '../../utils/converting.js';
import dayjs from 'dayjs';
import {
  generateRandomValue,
  getRandomBoolean,
  getRandomItem,
  getRandomItems
} from '../../utils/random.js';
import { MockData } from '../../types/mock-data.type.js';
import { RentOfferGeneratorInterface } from './rent-offer-generator.interface.js';
import { UserStatus } from '../../types/user-status.enum.js';

const NUM_AFTER_DIGIT = 1;
const NUM_PHOTOS = 6;

export default class RentOfferGenerator implements RentOfferGeneratorInterface {
  constructor (
    private readonly mockData: MockData,
    private readonly counter: number
  ) {}

  private readonly offerNumber = convertNumWithPads(this.counter);

  generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const postDate = dayjs().subtract(generateRandomValue(DaysInterval.FirstDay, DaysInterval.LastDay), 'day').toISOString();
    const city = getRandomItem<string>(this.mockData.cities);
    const preview = `preview${this.offerNumber}.jpg`;
    const photos = Array.from(
      {length: NUM_PHOTOS},
      (_item, index) =>
        `photo${this.offerNumber}-${convertNumWithPads(index)}.jpg`
    ).join(';');
    const premium = getRandomBoolean().toString();
    const favorite = getRandomBoolean().toString();
    const rating = generateRandomValue(RatingInterval.MinRating, RatingInterval.MaxRating, NUM_AFTER_DIGIT).toString();
    const propertyType = getRandomItem<string>(this.mockData.propertyTypes);
    const numRooms = generateRandomValue(RoomsInterval.MinRooms, RoomsInterval.MaxRooms).toString();
    const numGuests = generateRandomValue(GuestsInterval.MinGuests, GuestsInterval.MaxGuests).toString();
    const price = generateRandomValue(PriceInterval.MinPrice, PriceInterval.MaxPrice).toString();
    const amenities = getRandomItems<string>(this.mockData.amenities).join(';');
    const numComments = generateRandomValue(CommentsInterval.MinComments, CommentsInterval.MaxComments).toString();
    const coordinates = CityCoordinates[city as keyof typeof CityCoordinates].join(';');
    const username = getRandomItem<string>(this.mockData.usernames);
    const email = `${username.replace(/\s/g,'').toLowerCase}${getRandomItem<string>(this.mockData.emails)}`;
    const avatar = getRandomItem<string>(this.mockData.propertyTypes);
    const password = getRandomItem<string>(this.mockData.passwords);
    const userStatus = getRandomItem<string>([UserStatus.Standart, UserStatus.Pro]);

    return [
      title, description, postDate, city, preview,
      photos, premium, favorite, rating, propertyType,
      numRooms, numGuests, price, amenities, numComments,
      coordinates, username, email, avatar, password, userStatus
    ].join('\t');
  }
}

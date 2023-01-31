export enum DaysInterval {
  FirstDay = 1,
  LastDay = 7
}

export enum RatingInterval {
  MinRating = 0,
  MaxRating = 5,
}

export enum RoomsInterval {
  MinRooms = 1,
  MaxRooms = 8,
}

export enum GuestsInterval {
  MinGuests = 1,
  MaxGuests = 10,
}

export enum PriceInterval {
  MinPrice = 100,
  MaxPrice = 10000,
}

export enum CommentsInterval {
  MinComments = 0,
  MaxComments = 100,
}

export const CityCoordinates = {
  Paris: [48.85661, 2.351499],
  Cologne: [50.938361, 6.959974],
  Brussels: [50.846557, 4.351697],
  Amsterdam: [52.370216, 4.895168],
  Hamburg: [53.550341, 10.000654],
  Dusseldorf: [51.225402, 6.776314],
} as const;

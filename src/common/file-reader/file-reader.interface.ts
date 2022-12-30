import { RentOffer } from '../../types/rent-offer.type.js';

export interface FileReaderInterface {
  readonly filename: string;
  read(): void;
  toArray(): RentOffer[];
}

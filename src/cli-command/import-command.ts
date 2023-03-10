import chalk from 'chalk';
import { CliCommandInterface } from './cli-command.interface.js';
import ConsoleLoggerService from '../common/logger/console-logger.service.js';
import { createRentOffer, getErrorMessage } from '../utils/common.js';
import { DatabaseInterface } from '../common/database-client/database.interface.js';
import DatabaseService from '../common/database-client/database.service.js';
import { getURI } from '../utils/db.js';
import { LoggerInterface } from '../common/logger/logger.interface.js';
import { RentOffer } from '../types/rent-offer.type.js';
import { RentOfferModel } from '../modules/rent-offer/rent-offer.entity.js';
import RentOfferService from '../modules/rent-offer/rent-offer.service.js';
import { RentOfferServiceInterface } from '../modules/rent-offer/rent-offer-service.interface.js';
import TSVFileReader from '../common/file-reader/tsv-file-reader.js';
import { UserModel } from '../modules/user/user.entity.js';
import { UserServiceInterface } from '../modules/user/user-service.interface.js';
import UserService from '../modules/user/user.service.js';
import ConfigService from '../common/config/config.service.js';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';
  private userService!: UserServiceInterface;
  private rentOfferService!: RentOfferServiceInterface;
  private databaseService!: DatabaseInterface;
  private logger!: LoggerInterface;
  private configService!: ConfigService;
  private salt!: string;

  constructor() {
    this.onLine = this.onLine.bind(this);
    this.onComplete = this.onComplete.bind(this);

    this.logger = new ConsoleLoggerService();
    this.configService = new ConfigService(this.logger);
    this.rentOfferService = new RentOfferService(this.logger, RentOfferModel);
    this.userService = new UserService(this.logger, UserModel);
    this.databaseService = new DatabaseService(this.logger);
  }

  private async saveOffer(rentOffer: RentOffer) {
    const user = await this.userService.findOrCreate(rentOffer.user, this.salt);

    await this.rentOfferService.create({
      ...rentOffer,
      userId: user.id
    });
  }

  private async onLine(line: string, resolve: () => void) {
    const rentOffer = createRentOffer(line);
    await this.saveOffer(rentOffer);
    resolve();
  }

  private onComplete(count: number) {
    console.log(`${count} rows imported.`);
    this.databaseService.disconnect();
  }

  public async execute(
    filename: string
  ): Promise<void> {
    const login = this.configService.get('DB_USER');
    const password = this.configService.get('DB_PASSWORD');
    const host = this.configService.get('DB_HOST');
    const dbPort = this.configService.get('DB_PORT');
    const dbName = this.configService.get('DB_NAME');
    const salt = this.configService.get('SALT');

    const uri = getURI(login, password, host, dbPort, dbName);
    this.salt = salt;

    await this.databaseService.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());
    fileReader.on('line', this.onLine);
    fileReader.on('end', this.onComplete);

    try {
      await fileReader.read();
    } catch(err) {
      console.log(chalk.bgRed(`Can't read the file: ${getErrorMessage(err)}`));
    }
  }
}

import 'reflect-metadata';
import { Component } from '../types/component.types.js';
import { ConfigInterface } from '../common/config/config.interface.js';
import { DatabaseInterface } from '../common/database-client/database.interface.js';
import { getURI } from '../utils/db.js';
import { inject, injectable } from 'inversify';
import {LoggerInterface} from '../common/logger/logger.interface.js';
// import { RentOfferServiceInterface } from '../modules/rent-offer/rent-offer-service.interface.js';
// import { CommentServiceInterface } from '../modules/comment/comment-service.interface.js';
// import { UserServiceInterface } from '../modules/user/user-service.interface.js';

@injectable()
export default class Application {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigInterface,
    @inject(Component.DatabaseInterface) private databaseClient: DatabaseInterface,
    // @inject(Component.RentOfferServiceInterface) private rentOfferService: RentOfferServiceInterface, // TODO - убрать перед отправкой
    // @inject(Component.UserServiceInterface) private userService: UserServiceInterface, // TODO - убрать перед отправкой
    // @inject(Component.CommentServiceInterface) private commentService: CommentServiceInterface // TODO - убрать перед отправкой
  ) {}

  public async init() {
    this.logger.info('Application initialization…');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);


    const uri = getURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    await this.databaseClient.connect(uri);

    // console.log(await this.commentService.create({
    //   text: 'Новый коммент',
    //   rating: 4,
    //   offerId: '63d289f81b1caa245e7f0e29',
    //   userId: '63d289f81b1caa245e7f0e22'
    // }));// TODO - убрать перед отправкой
    // console.log(await this.rentOfferService.find());// TODO - убрать перед отправкой
    // console.log(await this.userService.findByEmail('vernagraham@mailfence.com'));// TODO - убрать перед отправкой
  }
}

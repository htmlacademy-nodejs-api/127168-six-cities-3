import { Container } from 'inversify';
import { Component } from '../../types/component.types.js';
import { RentOfferEntity, RentOfferModel } from './rent-offer.entity.js';
import RentOfferService from './rent-offer.service.js';
import { RentOfferServiceInterface } from './rent-offer-service.interface.js';
import { types } from '@typegoose/typegoose';
import RentOfferController from './rent-offer.controller.js';
import { ControllerInterface } from '../../common/controller/controller.interface.js';
import FavoriteOffersController from './rent-offer-favorite.controller.js';

const rentOfferContainer = new Container();

rentOfferContainer.bind<RentOfferServiceInterface>(Component.RentOfferServiceInterface).to(RentOfferService);
rentOfferContainer.bind<types.ModelType<RentOfferEntity>>(Component.RentOfferModel).toConstantValue(RentOfferModel);
rentOfferContainer.bind<ControllerInterface>(Component.RentOfferController).to(RentOfferController).inSingletonScope();
rentOfferContainer.bind<ControllerInterface>(Component.FavoriteOffersController).to(FavoriteOffersController).inSingletonScope();

export {rentOfferContainer};

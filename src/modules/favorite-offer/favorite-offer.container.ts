import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';
import { ControllerInterface } from '../../common/controller/controller.interface.js';
import { Component } from '../../types/component.types.js';
import { FavoriteOfferServiceInterface } from './favorite-offer-service.interface.js';
import FavoriteOfferController from './favorite-offer.controller.js';
import { FavoriteOfferEntity, FavoriteOfferModel } from './favorite-offer.entity.js';
import FavoriteOfferService from './favorite-offer.service.js';

const favoriteOfferContainer = new Container();

favoriteOfferContainer.bind<types.ModelType<FavoriteOfferEntity>>(Component.FavoriteOfferModel).toConstantValue(FavoriteOfferModel);
favoriteOfferContainer.bind<FavoriteOfferServiceInterface>(Component.FavoriteOfferServiceInterface).to(FavoriteOfferService).inSingletonScope();
favoriteOfferContainer.bind<ControllerInterface>(Component.FavoriteOfferController).to(FavoriteOfferController).inSingletonScope();

export {favoriteOfferContainer};

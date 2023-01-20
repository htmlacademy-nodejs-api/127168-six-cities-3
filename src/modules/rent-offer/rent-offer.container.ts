import { Container } from 'inversify';
import { Component } from '../../types/component.types.js';
import { RentOfferEntity, RentOfferModel } from './rent-offer.entity.js';
import RentOfferService from './rent-offer.service.js';
import { RentOfferServiceInterface } from './rent-offer-service.interface.js';
import { types } from '@typegoose/typegoose';

const rentOfferContainer = new Container();

rentOfferContainer.bind<RentOfferServiceInterface>(Component.RentOfferServiceInterface).to(RentOfferService);
rentOfferContainer.bind<types.ModelType<RentOfferEntity>>(Component.RentOfferModel).toConstantValue(RentOfferModel);

export {rentOfferContainer};

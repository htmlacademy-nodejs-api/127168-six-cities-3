import * as core from 'express-serve-static-core';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { Controller } from '../../common/controller/controller.js';
import HttpError from '../../common/errors/http-error.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/component.types.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { fillDTO } from '../../utils/common.js';
import CreateRentOfferDTO from './dto/create-rent-offer.dto.js';
import { RentOfferServiceInterface } from './rent-offer-service.interface.js';
import RentOfferFullResponse from './response/rent-offer-full.response.js';
import RentOfferMinResponse from './response/rent-offer-min.response.js';
import UpdateRentOfferDTO from './dto/update-rent-offer.dto.js';
import { RequestQuery } from '../../types/request-query.type.js';

type ParamsGetOffer = {
  offerId: string;
}

@injectable()
export default class RentOfferController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.RentOfferServiceInterface) private readonly rentOfferService: RentOfferServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for RentOfferController');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
    this.addRoute({path: '/premium', method: HttpMethod.Get, handler: this.findPremium});
    this.addRoute({path: '/:offerId', method: HttpMethod.Get, handler: this.show});
    this.addRoute({path: '/:offerId', method: HttpMethod.Patch, handler: this.update});
    this.addRoute({path: '/:offerId', method: HttpMethod.Delete, handler: this.delete});
  }

  public async index(
    req: Request<unknown, unknown, unknown, RequestQuery>,
    res: Response<Record<string, unknown>, Record<string, unknown>>
  ): Promise<void> {
    const limit = req.query.limit;

    const offers = await this.rentOfferService.find(limit);
    const offersResponse = fillDTO(RentOfferMinResponse, offers);
    this.ok(res, offersResponse);
  }

  public async create(
    req: Request<Record<string, unknown>, Record<string, unknown>, CreateRentOfferDTO>,
    res: Response): Promise<void> {

    const {body} = req;

    const newOffer = await this.rentOfferService.create(body);
    const newOfferResponse = fillDTO(RentOfferFullResponse, newOffer);

    this.created(res, newOfferResponse);
  }

  public async findPremium(
    _req: Request,
    res: Response<Record<string, unknown>, Record<string, unknown>>
  ) {
    const premiumOffers = await this.rentOfferService.findPremium();
    const premiumOffersResponse = fillDTO(RentOfferMinResponse, premiumOffers);
    this.ok(res, premiumOffersResponse);
  }

  public async show(
    req: Request<core.ParamsDictionary | ParamsGetOffer>,
    res: Response<Record<string, unknown>, Record<string, unknown>>
  ) {
    const offerId = req.params.offerId;
    const offer = await this.rentOfferService.findById(offerId);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found.`,
        'RentOfferController',
      );
    }

    const offerResponse = fillDTO(RentOfferFullResponse, offer);
    this.ok(res, offerResponse);
  }

  public async update(
    req: Request<core.ParamsDictionary | ParamsGetOffer, Record<string, unknown>, UpdateRentOfferDTO>,
    res: Response): Promise<void> {

    const {body} = req;
    const offerId = req.params.offerId;

    const updatedOffer = await this.rentOfferService.updateById(offerId, body);

    if (!updatedOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found.`,
        'RentOfferController',
      );
    }

    const updatedOfferResponse = fillDTO(RentOfferFullResponse, updatedOffer);

    this.ok(res, updatedOfferResponse);
  }

  public async delete(
    req: Request<core.ParamsDictionary | ParamsGetOffer>,
    res: Response): Promise<void> {

    const offerId = req.params.offerId;

    const deletedOffer = await this.rentOfferService.deleteById(offerId);

    if (!deletedOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found.`,
        'RentOfferController',
      );
    }

    this.noContent(res, deletedOffer);
  }
}

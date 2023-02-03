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
    this.addRoute({path: '/:offerId', method: HttpMethod.Get, handler: this.find});
    this.addRoute({path: '/:offerId', method: HttpMethod.Put, handler: this.update});
    this.addRoute({path: '/:offerId', method: HttpMethod.Delete, handler: this.delete});
  }

  public async index(
    _req: Request,
    res: Response<Record<string, unknown>, Record<string, unknown>>
  ) {
    const offers = await this.rentOfferService.find();
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

  public async find(
    req: Request,
    res: Response<Record<string, unknown>, Record<string, unknown>>
  ) {
    const offerId = req.params.offerId;

    const existOffer = await this.rentOfferService.exists(offerId);

    if (!existOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found.`,
        'RentOfferController',
      );
    }

    const offer = await this.rentOfferService.findById(offerId);
    const offerResponse = fillDTO(RentOfferFullResponse, offer);
    this.ok(res, offerResponse);
  }

  public async update(
    req: Request,
    res: Response): Promise<void> {

    const {body} = req;
    const offerId = req.params.offerId;

    const existOffer = await this.rentOfferService.exists(offerId);

    if (!existOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found.`,
        'RentOfferController',
      );
    }

    const updatedOffer = await this.rentOfferService.updateById(offerId, body);
    const updatedOfferResponse = fillDTO(RentOfferFullResponse, updatedOffer);

    this.ok(res, updatedOfferResponse);
  }

  public async delete(
    req: Request,
    res: Response): Promise<void> {

    const offerId = req.params.offerId;

    const existOffer = await this.rentOfferService.exists(offerId);

    if (!existOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found.`,
        'RentOfferController',
      );
    }

    const deletedOffer = await this.rentOfferService.deleteById(offerId);
    const deletedOfferResponse = fillDTO(RentOfferFullResponse, deletedOffer);

    this.noContent(res, deletedOfferResponse);
  }
}

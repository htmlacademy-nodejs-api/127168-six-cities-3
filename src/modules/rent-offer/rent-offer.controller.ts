import * as core from 'express-serve-static-core';
import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { Controller } from '../../common/controller/controller.js';
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
import { CommentServiceInterface } from '../comment/comment-service.interface.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-objectid.middleware.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';
import { DocumentExistsMiddleware } from '../../common/middlewares/document-exists.middleware.js';
import { PrivateRouteMiddleware } from '../../common/middlewares/private-route.middleware.js';
import { ConfigInterface } from '../../common/config/config.interface.js';
import { UploadFileMiddleware } from '../../common/middlewares/upload-file.middleware.js';
import UploadPreviewResponse from './response/upload-preview.response.js';
import { CityCoordinates } from '../../common/rent-offer-generator/rent-offer-generator.const.js';
import { CheckOfferAndUserMiddleware } from '../../common/middlewares/check-offer-and-user.middleware.js';

type ParamsGetOffer = {
  offerId: string;
}

@injectable()
export default class RentOfferController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.ConfigInterface) configService: ConfigInterface,
    @inject(Component.RentOfferServiceInterface) private readonly rentOfferService: RentOfferServiceInterface,
    @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
  ) {
    super(logger, configService);

    this.logger.info('Register routes for RentOfferController');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateRentOfferDTO)
      ]
    });
    this.addRoute({
      path: '/premium',
      method: HttpMethod.Get,
      handler: this.findPremium
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.rentOfferService, 'Rent offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateRentOfferDTO),
        new DocumentExistsMiddleware(this.rentOfferService, 'Rent offer', 'offerId'),
        new CheckOfferAndUserMiddleware(this.rentOfferService, 'Rent offer', 'offerId')
      ]});
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.rentOfferService, 'Rent offer', 'offerId'),
        new CheckOfferAndUserMiddleware(this.rentOfferService, 'Rent offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId/preview',
      method: HttpMethod.Post,
      handler: this.uploadPreview,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'image'),
        new CheckOfferAndUserMiddleware(this.rentOfferService, 'Rent offer', 'offerId')
      ]
    });
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
    res: Response
  ): Promise<void> {
    const {body, user} = req;
    const newOffer = await this.rentOfferService.create(
      {
        ...body,
        coordinates: CityCoordinates[body.city] as [number, number],
        userId: user.id
      });
    this.created(res, fillDTO(RentOfferFullResponse, newOffer));
  }

  public async findPremium(
    _req: Request,
    res: Response<Record<string, unknown>, Record<string, unknown>>
  ): Promise<void> {
    const premiumOffers = await this.rentOfferService.findPremium();
    const premiumOffersResponse = fillDTO(RentOfferMinResponse, premiumOffers);
    this.ok(res, premiumOffersResponse);
  }

  public async show(
    req: Request<core.ParamsDictionary | ParamsGetOffer>,
    res: Response<Record<string, unknown>, Record<string, unknown>>
  ): Promise<void> {
    const offerId = req.params.offerId;
    const offer = await this.rentOfferService.findById(offerId);
    this.ok(res, fillDTO(RentOfferFullResponse, offer));
  }

  public async update(
    req: Request<core.ParamsDictionary | ParamsGetOffer, Record<string, unknown>, UpdateRentOfferDTO>,
    res: Response
  ): Promise<void> {
    const {body, params} = req;
    const updatedOffer = await this.rentOfferService.updateById(params.offerId, body);
    this.ok(res, fillDTO(RentOfferFullResponse, updatedOffer));
  }

  public async delete(
    req: Request<core.ParamsDictionary | ParamsGetOffer>,
    res: Response
  ): Promise<void> {
    const offerId = req.params.offerId;
    const deletedOffer = await this.rentOfferService.deleteById(offerId);
    await this.commentService.deleteByOfferId(offerId);
    this.noContent(res, deletedOffer);
  }

  public async uploadPreview(req: Request<core.ParamsDictionary | ParamsGetOffer>, res: Response) {
    const {offerId} = req.params;
    const updateDTO = { preview: req.file?.filename };
    await this.rentOfferService.updateById(offerId, updateDTO);
    this.created(res, fillDTO(UploadPreviewResponse, updateDTO));
  }
}

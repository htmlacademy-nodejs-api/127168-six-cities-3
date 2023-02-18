import * as core from 'express-serve-static-core';
import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { Controller } from '../../common/controller/controller.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-objectid.middleware.js';
import { Component } from '../../types/component.types.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { DocumentExistsMiddleware } from '../../common/middlewares/document-exists.middleware.js';
import { RentOfferServiceInterface } from '../rent-offer/rent-offer-service.interface.js';
import { PrivateRouteMiddleware } from '../../common/middlewares/private-route.middleware.js';
import { FavoriteOfferServiceInterface } from './favorite-offer-service.interface.js';
import HttpError from '../../common/errors/http-error.js';
import { StatusCodes } from 'http-status-codes';

type ParamsGetOffer = {
  offerId: string;
}

@injectable()
export default class FavoriteOfferController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.FavoriteOfferServiceInterface) private readonly favoriteOfferService: FavoriteOfferServiceInterface,
    @inject(Component.RentOfferServiceInterface) private readonly rentOfferService: RentOfferServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for FavoriteOfferController');

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.rentOfferService, 'Rent offer', 'offerId')
      ]
    });
  }

  public async create(
    req: Request<core.ParamsDictionary | ParamsGetOffer>,
    res: Response<Record<string, unknown>, Record<string, unknown>>
  ): Promise<void> {
    const userId = req.user.id;
    const offerId = req.params.offerId;

    const existsFavoriteOffer = await this.favoriteOfferService.exists(userId, offerId);

    if (existsFavoriteOffer) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `Favorite offer with userId «${userId}» and offerId «${offerId}» exists.`,
        'FavoriteOfferController'
      );
    }

    const newFavoriteOffer = await this.favoriteOfferService.create({userId, offerId});
    this.ok(res, newFavoriteOffer);
  }
}

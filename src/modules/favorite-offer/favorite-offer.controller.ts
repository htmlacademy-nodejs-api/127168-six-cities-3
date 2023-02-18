import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { Controller } from '../../common/controller/controller.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-objectid.middleware.js';
import { Component } from '../../types/component.types.js';
import { HttpMethod } from '../../types/http-method.enum.js';

@injectable()
export default class FavoriteOfferController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    // @inject(Component.RentOfferServiceInterface) private readonly rentOfferService: RentOfferServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for FavoriteOfferController');

    // this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({
      path: '/:offerId/:status',
      method: HttpMethod.Patch,
      handler: this.patch,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        // new DocumentExistsMiddleware(this.rentOfferService, 'Rent offer', 'offerId')
      ]
    });
  }

  // public async index(
  //   _req: Request,
  //   res: Response<Record<string, unknown>, Record<string, unknown>>
  // ): Promise<void> {
  //   const favoriteOffers = await this.rentOfferService.findFavorite();
  //   const favoriteOffersResponse = fillDTO(RentOfferMinResponse, favoriteOffers);
  //   this.ok(res, favoriteOffersResponse);
  // }

  public async patch(
    req: Request,
    res: Response<Record<string, unknown>, Record<string, unknown>>
  ): Promise<void> {
    const {user} = req;
    const offerId = req.params.offerId;
    const status = req.params.status;
    const booleanStatus = Boolean(Number(status));

    this.ok(res, {offerId, booleanStatus, userId: user.id});
  }
}

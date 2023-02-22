import * as core from 'express-serve-static-core';
import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { Controller } from '../../common/controller/controller.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/component.types.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { fillDTO } from '../../utils/common.js';
import { RentOfferServiceInterface } from '../rent-offer/rent-offer-service.interface.js';
import { CommentServiceInterface } from './comment-service.interface.js';
import CommentResponse from './response/comment.response.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-objectid.middleware.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';
import { DocumentExistsMiddleware } from '../../common/middlewares/document-exists.middleware.js';
import CreateCommentDTO from './dto/create-comment.dto.js';
import { PrivateRouteMiddleware } from '../../common/middlewares/private-route.middleware.js';
import { ConfigInterface } from '../../common/config/config.interface.js';

type ParamsGetOffer = {
  offerId: string;
}

@injectable()
export default class CommentController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.ConfigInterface) configService: ConfigInterface,
    @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
    @inject(Component.RentOfferServiceInterface) private readonly rentOfferService: RentOfferServiceInterface,
  ) {
    super(logger, configService);

    this.logger.info('Register routes for CommentController...');

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.find,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.rentOfferService, 'Rent offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(CreateCommentDTO),
        new DocumentExistsMiddleware(this.rentOfferService, 'Rent offer', 'offerId')
      ]
    });
  }

  public async find(
    req: Request<core.ParamsDictionary | ParamsGetOffer, object, object>,
    res: Response): Promise<void> {
    const {params, query} = req;
    const comments = await this.commentService.findByOfferId(params.offerId, Number(query.limit));
    this.ok(res, fillDTO(CommentResponse, comments));
  }

  public async create(
    req: Request<core.ParamsDictionary | ParamsGetOffer, object, CreateCommentDTO>,
    res: Response
  ): Promise<void> {
    const {offerId} = req.params;
    const body = {
      ...req.body,
      offerId,
      userId: req.user.id
    };
    const newComment = await this.commentService.create(body);
    await this.rentOfferService.updateCommentCountAndRating(offerId, body.rating);
    this.created(res, fillDTO(CommentResponse, newComment));
  }
}

import * as core from 'express-serve-static-core';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
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
// import CreateCommentClientDTO from './dto/create-comment.client.dto.js';
import CreateCommentDTO from './dto/create-comment.dto.js';

type ParamsGetOffer = {
  offerId: string;
}

@injectable()
export default class CommentController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
    @inject(Component.RentOfferServiceInterface) private readonly rentOfferService: RentOfferServiceInterface,
  ) {
    super(logger);

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
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(CreateCommentDTO),
        new DocumentExistsMiddleware(this.rentOfferService, 'Rent offer', 'offerId')
      ]
    });
  }

  public async find(
    req: Request<core.ParamsDictionary | ParamsGetOffer, object, object>,
    res: Response): Promise<void> {
    const offerId = req.params.offerId;
    const comments = await this.commentService.findByOfferId(offerId);
    const commentResponse = fillDTO(CommentResponse, comments);
    this.send(res, StatusCodes.OK, commentResponse);
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
    const newCommentResponse = fillDTO(CommentResponse, newComment);

    this.created(res, newCommentResponse);
  }
}

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
import { RentOfferServiceInterface } from '../rent-offer/rent-offer-service.interface.js';
import { CommentServiceInterface } from './comment-service.interface.js';
import CreateCommentDTO from './dto/create-comment.dto.js';
import CommentResponse from './response/comment.response.js';

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

    this.addRoute({path: '/:offerId', method: HttpMethod.Get, handler: this.find});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
  }

  public async find(
    req: Request<core.ParamsDictionary | ParamsGetOffer, object, object>,
    res: Response): Promise<void> {
    const offerId = req.params.offerId;

    if (!await this.rentOfferService.exists(offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found.`,
        'CommentController',
      );
    }

    const comments = await this.commentService.findByOfferId(offerId);
    const commentResponse = fillDTO(CommentResponse, comments);

    this.send(res, StatusCodes.OK, commentResponse);
  }


  public async create(
    req: Request<object, object, CreateCommentDTO>,
    res: Response
  ): Promise<void> {

    const {body} = req;

    if (!await this.rentOfferService.exists(body.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${body.offerId} not found.`,
        'CommentController',
      );
    }

    const newComment = await this.commentService.create(body);
    await this.rentOfferService.updateCommentCountAndRating(body.offerId, body.rating);
    const newCommentResponse = fillDTO(CommentResponse, newComment);

    this.created(res, newCommentResponse);
  }
}

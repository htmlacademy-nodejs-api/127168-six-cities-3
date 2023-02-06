import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { Controller } from '../../common/controller/controller.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/component.types.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { fillDTO } from '../../utils/common.js';
import { CommentServiceInterface } from './comment-service.interface.js';
import CreateCommentDTO from './dto/create-comment.dto.js';
import CommentResponse from './response/comment.response.js';

@injectable()
export default class CommentController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController...');

    this.addRoute({path: '/:offerId', method: HttpMethod.Get, handler: this.find});
    this.addRoute({path: '/:offerId', method: HttpMethod.Post, handler: this.create});
  }

  public async find(req: Request, res: Response): Promise<void> {
    const offerId = req.params.offerId;
    const comments = await this.commentService.findByOfferId(offerId);
    const commentResponse = fillDTO(CommentResponse, comments);

    this.send(res, StatusCodes.OK, commentResponse);
  }


  public async create(
    req: Request<Record<string, unknown>, Record<string, unknown>, CreateCommentDTO>,
    res: Response): Promise<void> {

    const {body} = req;

    const newComment = await this.commentService.create(body);
    const newCommentResponse = fillDTO(CommentResponse, newComment);

    this.send(res, StatusCodes.CREATED, newCommentResponse);
  }
}

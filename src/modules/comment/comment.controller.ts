import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { Controller } from '../../common/controller/controller.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/component.types.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { CommentServiceInterface } from './comment-service.interface.js';

@injectable()
export default class CommentController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController...');

    this.addRoute({path: '/:offerId', method: HttpMethod.Get, handler: this.find});
    // this.addRoute({path: '/:offerId', method: HttpMethod.Post, handler: this.create});
  }

  public async find(req: Request, res: Response): Promise<void> {
    const offerId = req.params.offerId;
    const comments = await this.commentService.findByOfferId(offerId);

    this.send(res, StatusCodes.OK, comments);
  }


  // public create(_req: Request, _res: Response): void {

  // }
}

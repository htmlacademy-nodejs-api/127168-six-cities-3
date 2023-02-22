import {MiddlewareInterface} from '../../types/middleware.interface.js';
import {NextFunction, Request, Response} from 'express';
import HttpError from '../errors/http-error.js';
import {StatusCodes} from 'http-status-codes';
import { DocumentFinderInterface } from '../../types/document-fider.interface.js';

export class CheckOfferAndUserMiddleware implements MiddlewareInterface {
  constructor(
    private readonly service: DocumentFinderInterface,
    private readonly entityName: string,
    private readonly paramName: string,
  ) {}

  public async execute({params, user}: Request, _res: Response, next: NextFunction): Promise<void> {
    const documentId = params[this.paramName];
    const document = await this.service.findById(documentId);

    if (document?.userId?.id !== user.id) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        `User ${user.email} cannot edit ${this.entityName} ${document?.id}`,
        'CheckOfferAndUserMiddleware'
      );
    }

    next();
  }
}

import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { ConfigInterface } from '../../common/config/config.interface.js';
import { Controller } from '../../common/controller/controller.js';
import HttpError from '../../common/errors/http-error.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { UploadFileMiddleware } from '../../common/middlewares/upload-file.middleware.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-objectid.middleware.js';
import { Component } from '../../types/component.types.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { createJWT, fillDTO } from '../../utils/common.js';
import CreateUserDTO from './dto/create-user.dto.js';
import LoginUserDTO from './dto/login-user.dto.js';
import LoggedUserResponse from './response/logged-user.response.js';
import UserResponse from './response/user.response.js';
import { UserServiceInterface } from './user-service.interface.js';
import { JWT_ALGORITM } from './user.constant.js';

@injectable()
export default class UserController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.UserServiceInterface) private readonly userService: UserServiceInterface,
    @inject(Component.ConfigInterface) private readonly configService: ConfigInterface,
  ) {
    super(logger);
    this.logger.info('Register routes for UserController…');

    this.addRoute({
      path: '/register',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateUserDTO)]
    });
    this.addRoute({path: '/login', method: HttpMethod.Post, handler: this.login});
    this.addRoute({path: '/login', method: HttpMethod.Get, handler: this.checkAuth});
    this.addRoute({path: '/logout', method: HttpMethod.Delete, handler: this.logout});
    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new ValidateObjectIdMiddleware('userId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'avatar'),
      ]
    });
  }

  public async create(
    req: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDTO>,
    res: Response
  ): Promise<void> {
    const {body} = req;

    const existsUser = await this.userService.findByEmail(body.email);

    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email «${body.email}» exists.`,
        'UserController'
      );
    }

    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.send(
      res,
      StatusCodes.CREATED,
      fillDTO(UserResponse, result)
    );
  }

  public async login(
    req: Request<Record<string, unknown>, Record<string, unknown>, LoginUserDTO>,
    res: Response
  ): Promise<void> {
    const {body} = req;

    const user = await this.userService.verifyUser(body, this.configService.get('SALT'));

    if (!user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }

    const token = await createJWT(
      JWT_ALGORITM,
      this.configService.get('JWT_SECRET'),
      {id: user.id, email: user.email}
    );

    this.ok(res, fillDTO(LoggedUserResponse, {email: user.email, token}));
  }

  public async checkAuth(_req: Request, _res: Response) {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController',
    );
  }

  public async logout(_req: Request, _res: Response) {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController',
    );
  }

  public async uploadAvatar(req: Request, res: Response) {
    this.created(res, {
      filepath: req.file?.path
    });
  }
}

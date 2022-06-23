import { NextFunction, Request, Response } from 'express';

import { UnauthorizedError } from 'restify-errors';
import { verifyToken } from '../auth';

import UserService from '../service/userService';

export default class AuthMiddleware {
  private _service;

  constructor() {
    this._service = new UserService();
  }

  public async validateToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { authorization } = req.headers;
    if (!authorization) {
      const err = new UnauthorizedError('Token not found');
      return next(err);
    }

    const auth = verifyToken(authorization);
    if (!auth) {
      const err = new UnauthorizedError('Expired or invalid token');
      return next(err);
    }

    const { data } = auth;
    const user = await this._service.findUserByEmail(data.email);
    if (user) {
      req.headers.userId = `${user.id}`;
    }

    return next();
  }
}

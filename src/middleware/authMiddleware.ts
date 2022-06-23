import { NextFunction, Request, Response } from 'express';

import { UnauthorizedError } from 'restify-errors';

import { verifyToken } from '../auth';

export default class AuthMiddleware {
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

    const { email } = auth;
    req.headers.userEmail = `${email}`;

    return next();
  }
}

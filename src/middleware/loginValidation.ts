import { NextFunction, Request, Response } from 'express';

import * as Joi from 'joi';

import { BadRequestError } from 'restify-errors';

const emailRegex = /\S+@\S+\.\S+/;
const validateEmailWithRegex = (email: string) => emailRegex.test(email);

export default class LoginValidation {
  private static joi = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  public async validate(
    req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { error } = LoginValidation.joi.validate(req.body);
    if (error) {
      const err = new BadRequestError(error.message);
      return next(err);
    }

    const emailFormatValidation = validateEmailWithRegex(req.body.email);
    if (!emailFormatValidation) {
      const err = new BadRequestError('"email" must be a valid email');
      return next(err);
    }

    return next();
  }
}

import { NextFunction, Request, Response } from 'express';

import * as Joi from 'joi';

import { BadRequestError } from 'restify-errors';

import User from '../database/models/User';

const emailRegex = /\S+@\S+\.\S+/;
const validateEmailWithRegex = (email: string) => emailRegex.test(email);

export default class RegisterValidation {
  private _model;

  constructor() {
    this._model = User;
  }

  private static joi = Joi.object({
    username: Joi.string().min(4).required(),
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
  });

  public async validate(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { error } = RegisterValidation.joi.validate(req.body);
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

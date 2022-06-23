import { NextFunction, Request, Response } from 'express';

import * as Joi from 'joi';

import { BadRequestError } from 'restify-errors';

export default class TaskValidation {
  private static joi = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().allow(''),
    status: Joi.string().required(),
  });

  public async createValidation(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { error } = TaskValidation.joi.validate(req.body);
    if (error) {
      const err = new BadRequestError(error.message);
      return next(err);
    }

    return next();
  }
}

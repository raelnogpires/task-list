import { NextFunction, Request, Response } from 'express';

import UserService from '../service/userService';

import { generateToken } from '../auth';

export default class UserController {
  private _service;

  constructor() {
    this._service = new UserService();
  }

  public async registerUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      await this._service.registerUser(req.body);
      return res.status(201).json({ message: 'User registered with success!' });
    } catch (error) {
      return next(error);
    }
  }

  public async userLogin(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      await this._service.userLogin(req.body);
      const token = generateToken(req.body.email);
      return res.status(200).json({ token });
    } catch (error) {
      return next(error);
    }
  }
}

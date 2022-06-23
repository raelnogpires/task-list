import { NextFunction, Request, Response } from 'express';

import UserService from '../service/userService';

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
}

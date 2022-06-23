import User from '../database/models/User';

import IUserService from '../@types/interfaces/userService.interface';
import { CreateUserT } from '../@types/types/user.type';

export default class UserService implements IUserService {
  private _model;

  constructor() {
    this._model = User;
  }

  public async registerUser(user: CreateUserT): Promise<void> {
    await this._model.create(user);
  }
}

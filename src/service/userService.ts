import User from '../database/models/User';

import { hashPassword } from '../utils/encrypting';

import IUserService from '../@types/interfaces/userService.interface';
import { CreateUserT } from '../@types/types/user.type';

export default class UserService implements IUserService {
  private _model;

  constructor() {
    this._model = User;
  }

  public async registerUser(user: CreateUserT): Promise<void> {
    const { username, password, email } = user;
    const hash = await hashPassword(password)
    await this._model.create({ username, password: hash, email });
  }
}

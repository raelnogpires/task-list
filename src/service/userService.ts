import { BadRequestError, NotFoundError } from 'restify-errors';

import User from '../database/models/User';

import { hashPassword, comparePassword } from '../utils/encrypting';

import IUserService from '../@types/interfaces/userService.interface';
import { CreateUserT, UserLoginT, UserT } from '../@types/types/user.type';

export default class UserService implements IUserService {
  private _model;

  constructor() {
    this._model = User;
  }

  public async findUserByEmail(email: string): Promise<UserT | false> {
    const user = await this._model.findOne({ where: { email } });
    if (!user) return false;
    return user;
  }

  public async registerUser(user: CreateUserT): Promise<void> {
    const { username, password, email } = user;
    const userExist = await this._model.findOne({ where: { email } });
    if (userExist) throw new BadRequestError('Email already registered');

    const hash = await hashPassword(password)
    await this._model.create({ username, password: hash, email });
  }

  public async userLogin({ email, password }: UserLoginT): Promise<void> {
    const user = await this._model.findOne({ where: { email } });
    if (!user) throw new NotFoundError('User not found');

    const checkCredentials = await comparePassword(user.password, password);
    if (!checkCredentials) throw new BadRequestError('Invalid credentials'); 
  }
}

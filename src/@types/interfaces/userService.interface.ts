import { CreateUserT, UserLoginT } from '../types/user.type';

export default interface IUserService {
  registerUser(user: CreateUserT): Promise<void>;
  userLogin(user: UserLoginT): Promise<void>;
}

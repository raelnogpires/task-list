import { CreateUserT } from '../types/user.type';

export default interface IUserService {
  registerUser(user: CreateUserT): Promise<void>;
}

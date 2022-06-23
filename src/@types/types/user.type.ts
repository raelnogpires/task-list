export type UserT = {
  id: number,
  username: string,
  email: string,
  password: string,
};

export type CreateUserT = Omit<UserT, 'id'>;

export type UserLoginT = Omit<UserT, 'id' | 'username'>;

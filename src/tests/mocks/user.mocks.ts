// REGISTER MOCKS
export const mockUserRegister = {
  username: 'rael',
  email: 'rael@ebytr.com',
  password: 'cleanenergy',
}

export const mockCompleteUser = {
  id: 1,
  username: 'rael',
  email: 'rael@ebytr.com',
  password: 'cleanenergy',
}

export const mockWithoutEmailUser = {
  username: 'rael',
  password: 'cleanenergy',
}

export const mockInvalidEmailUser = {
  username: 'rael',
  email: 'devzinho',
  password: 'cleanenergy',
}

export const mockWithoutUsername = {
  email: 'rael@ebytr.com',
  password: 'cleanenergy',
}

export const mockInvalidUsername = {
  username: 'a',
  email: 'rael@ebytr.com',
  password: 'cleanenergy',
}

export const mockWithoutPassword = {
  username: 'rael',
  email: 'rael@ebytr.com',
}

export const mockInvalidPassword = {
  username: 'rael',
  email: 'rael@ebytr.com',
  password: 'a',
}

// LOGIN MOCKS
export const mockUserLogin = {
  email: 'rael@ebytr.com',
  password: 'cleanenergy',
};

export const mockLoginWithoutEmail = {
  password: 'cleanenergy',
}

export const mockLoginInvalidEmail = {
  email: 'rael',
  password: 'cleanenergy',
}

export const mockLoginWithoutPass = {
  email: 'rael@ebytr.com',
}
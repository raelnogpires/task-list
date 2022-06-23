import * as jwt from 'jsonwebtoken';

import jwtConfig from './config';

type TokenValidateData = {
  email: string,
}

export const generateToken = (email: string): string => {
  const { secret, expiresIn, algorithm } = jwtConfig;

  const token = jwt.sign({ email }, secret, { expiresIn, algorithm });

  return token;
};

export const verifyToken = (token: string): TokenValidateData | null => {
  const { secret } = jwtConfig;
  // try/catch preventing 'jsonwebtoken mal formed' type of error
  try {
    return jwt.verify(token, secret) as TokenValidateData;
  } catch (error) {
    return null;
  }
}

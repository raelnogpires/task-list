import { readFileSync } from 'fs';
import 'dotenv/config';

import * as jwt from 'jsonwebtoken';

type JWTConfig = {
  secret: jwt.Secret,
  expiresIn: jwt.SignOptions['expiresIn'],
  algorithm: jwt.Algorithm,
};

const jwtConfig: JWTConfig = {
  // making sure that encoding is utf-8
  secret: readFileSync('jwt.key', 'utf8'),
  expiresIn: '2d',
  algorithm: 'HS256',
};

export default jwtConfig;

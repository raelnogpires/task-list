import { Request, Response, NextFunction } from 'express';
import { DefinedHttpError, InternalServerError } from 'restify-errors';

const serializeError = (err: DefinedHttpError): DefinedHttpError => {
    if (err.statusCode) {
      return err;
    }
  
    return new InternalServerError('Internal Server Error', err);
};

const errorMiddleware = (
  err: DefinedHttpError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const error = serializeError(err);
  const { statusCode, message } = error;

  return res.status(statusCode).json({ message });
};

export default errorMiddleware;

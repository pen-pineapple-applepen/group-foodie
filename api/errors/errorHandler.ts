import { NextFunction, Request, Response } from 'express';
import ApiError from './apiError';
import BaseError from './baseError';

export function errorHandler(err: ApiError, req: Request, res: Response, next: NextFunction): void {
  console.error(err);
  const status = err.httpError.status || 'Internal Server Error';
  const statusCode = err.httpError.statusCode || 500;
  const message = err.message || 'something went wrong';
  const { additionalLog } = err;
  res.status(statusCode).json({
    status,
    statusCode,
    message,
    additionalLog,
  });
}

export function isOperationError(err: BaseError | Error): boolean {
  if (err instanceof BaseError) {
    return err.isOperational;
  }
  return false;
}

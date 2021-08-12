import { NextFunction, Request, Response } from 'express';
import BaseError from './baseError';

export function errorHandler(
  err: BaseError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error(err);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'something went wrong';
  res.status(statusCode).json({
    status: 'Not Found',
    statusCode,
    message,
  });
}

export function isOperationError(err: BaseError | Error): boolean {
  if (err instanceof BaseError) {
    return err.isOperational;
  }
  return false;
}

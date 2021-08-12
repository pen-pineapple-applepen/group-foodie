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
  const name = err.name || 'something went wrong';
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    name,
  });
}

export function isOperationError(err: BaseError | Error): boolean {
  if (err instanceof BaseError) {
    return err.isOperational;
  }
  return false;
}

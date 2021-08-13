import httpErrors, { HttpError } from './httpErrors';
import BaseError from './baseError';

class ApiError extends BaseError {
  message: string;

  additionalLog?: any;

  constructor(
    message: string,
    httpError: HttpError = httpErrors.NOT_FOUND,
    additionalLog: any = undefined,
    isOperational = true
  ) {
    super(message, httpError, isOperational);
    this.additionalLog = additionalLog;
  }
}

export default ApiError;

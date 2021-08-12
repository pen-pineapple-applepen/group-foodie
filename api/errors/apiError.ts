import httpStatusCodes, { HttpStatusCode } from './httpStatusCodes';
import BaseError from './baseError';

class ApiError extends BaseError {
  message: string;

  constructor(
    message: string,
    httpStatusCode: HttpStatusCode = httpStatusCodes.NOT_FOUND,
    isOperational = true
  ) {
    super(message, httpStatusCode, isOperational);
  }
}

export default ApiError;

import httpStatusCodes, { HttpStatusCode } from './httpStatusCodes';
import BaseError from './baseError';

class ApiError extends BaseError {
  message: string;

  additionalLog?: any;

  constructor(
    message: string,
    httpStatusCode: HttpStatusCode = httpStatusCodes.NOT_FOUND,
    additionalLog: any = undefined,
    isOperational = true
  ) {
    super(message, httpStatusCode, isOperational);
    this.additionalLog = additionalLog;
  }
}

export default ApiError;

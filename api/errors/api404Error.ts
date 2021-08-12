import httpStatusCodes from './httpStatusCodes';
import BaseError from './baseError';

class Api404Error extends BaseError {
  message: string;

  constructor(
    message: string,
    statusCode = httpStatusCodes.NOT_FOUND,
    isOperational = true,
    description = 'internal server error'
  ) {
    super(message, statusCode, isOperational, description);
  }
}

export default Api404Error;

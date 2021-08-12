import httpStatusCodes from './httpStatusCodes';
import BaseError from './baseError';

class Api404Error extends BaseError {
  status: number;

  message: string;

  constructor(
    name: string,
    statusCode = httpStatusCodes.NOT_FOUND,
    isOperational = true,
    description = 'internal server error'
  ) {
    super(name, statusCode, isOperational, description);
  }
}

export default Api404Error;

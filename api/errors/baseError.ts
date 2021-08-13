import { HttpError } from './httpErrors';

export default class BaseError extends Error {
  public readonly message: string;

  public readonly httpError: HttpError;

  public readonly isOperational: boolean;

  constructor(message: string, httpError: HttpError, isOperational: boolean) {
    super();

    Object.setPrototypeOf(this, new.target.prototype);
    this.message = message;
    this.httpError = httpError;
    this.isOperational = isOperational;
    Error.captureStackTrace(this);
  }
}

import { HttpStatusCode } from "./httpStatusCodes";

interface baseError {
  name: string;
  statusCode: number;
  isOperational: boolean;
}

export default class BaseError extends Error {
  public readonly message: string;

  public readonly httpStatusCode: HttpStatusCode;

  public readonly isOperational: boolean;

  constructor(message: string, httpStatusCode: HttpStatusCode, isOperational: boolean) {
    super();

    Object.setPrototypeOf(this, new.target.prototype);
    this.message = message;
    this.httpStatusCode = httpStatusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this);
  }
}

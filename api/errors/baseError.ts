interface baseError {
  name: string;
  statusCode: number;
  isOperational: boolean;
  description: string;
}

export default class BaseError extends Error {
  public readonly message: string;

  public readonly statusCode: number;

  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational: boolean, description: string) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);
    this.message = message;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this);
  }
}

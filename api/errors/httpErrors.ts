export interface HttpError {
  status: 'Ok' | 'Bad Request' | 'Not Found' | 'Internal Server Error';
  statusCode: 200 | 400 | 404 | 500;
}

export interface AllErrors {
  OK: HttpError;
  BAD_REQUEST: HttpError;
  NOT_FOUND: HttpError;
  INTERNAL_SERVER: HttpError;
}

const allErrors: AllErrors = {
  OK: {
    status: 'Ok',
    statusCode: 200,
  },
  BAD_REQUEST: {
    status: 'Bad Request',
    statusCode: 400,
  },
  NOT_FOUND: {
    status: 'Not Found',
    statusCode: 404,
  },
  INTERNAL_SERVER: {
    status: 'Internal Server Error',
    statusCode: 500,
  },
};

export default allErrors;

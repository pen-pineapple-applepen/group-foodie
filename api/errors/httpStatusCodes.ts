export interface HttpStatusCode {
  status: 'Ok' | 'Bad Request' | 'Not Found' | 'Internal Server Error';
  statusCode: 200 | 400 | 404 | 500;
}

export interface AllStatusCodes {
  OK: HttpStatusCode;
  BAD_REQUEST: HttpStatusCode;
  NOT_FOUND: HttpStatusCode;
  INTERNAL_SERVER: HttpStatusCode;
}

const httpStatusCodes: AllStatusCodes = {
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

export default httpStatusCodes;

import { NextFunction, Request, Response } from 'express';
import { body, param, ValidationChain, validationResult } from 'express-validator';
import ApiError from '../../errors/apiError';
import httpStatusCodes from '../../errors/httpStatusCodes';

type userMethod =
  | 'getOneUser'
  | 'createUser'
  | 'getFriends'
  | 'createFriend'
  | 'checkPasswordWithEmail';

export const userValidator = {
  getOneUser: [
    param('user_id').exists(),
    (req: Request, res: Response, next: NextFunction): void | ApiError => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ApiError('user id is not defined', httpStatusCodes.BAD_REQUEST);
      }
    },
  ],
  createUser: [
    body('first_name').exists().isString(),
    body('last_name').exists().isString(),
    body('email').normalizeEmail().isEmail(),
    body('username').exists().isString(),
    body('password').exists().isString(),
    body('guest').exists(),
    (req: Request, res: Response, next: NextFunction): void | ApiError => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ApiError(
          `following parameters are missing in creating user:`,
          httpStatusCodes.BAD_REQUEST,
          errors.array()
        );
      }
    },
  ],
  getFriends: [],
  createFriend: [],
  checkPasswordWithEmail: [],
};

export default userValidator;

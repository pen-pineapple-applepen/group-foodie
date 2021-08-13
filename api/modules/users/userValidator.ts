import { NextFunction, Request, Response } from 'express';
import { body, param, query, ValidationChain, validationResult } from 'express-validator';
import ApiError from '../../errors/apiError';
import httpErrors from '../../errors/httpErrors';

type userMethod =
  | 'getOneUser'
  | 'createUser'
  | 'getFriends'
  | 'createFriend'
  | 'checkPasswordWithEmail';

export const userValidator = {
  getOneUser: [
    param('user_id').exists().isInt().withMessage('user id must be an integer'),
    (req: Request, res: Response, next: NextFunction): void | ApiError => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ApiError('user id is not defined', httpErrors.BAD_REQUEST, errors.array());
      }
    },
  ],
  createUser: [
    body('first_name').exists().isString().withMessage('first name is undefined or not a string'),
    body('last_name').exists().isString().withMessage('last name is undefined or not a string'),
    body(['email']).normalizeEmail().isEmail().withMessage('email is in incorrect format'),
    body('username').exists().isString().withMessage('username is undefined or not a string'),
    body('password').exists().isString().withMessage('password is undefined or not a string'),
    body('guest').exists().withMessage('guest is undefined'),
    (req: Request, res: Response, next: NextFunction): void | ApiError => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ApiError(
          `following parameters are missing in creating user:`,
          httpErrors.BAD_REQUEST,
          errors.array()
        );
      }
      next();
    },
  ],
  getFriends: [
    param('user_id')
      .isInt()
      .withMessage('user id must be an integer')
      .exists({ checkNull: true })
      .withMessage('user id must exist'),
    (req: Request, res: Response, next: NextFunction): void | ApiError => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ApiError(
          `error validating get friends request`,
          httpErrors.BAD_REQUEST,
          errors.array()
        );
      }
      next();
    },
  ],
  createFriend: [
    param('user_id').exists().isInt().withMessage('user id is undefined or not an integer'),
    body('friend_id').exists().isInt().withMessage('friend id is undefined or not an integer'),
    (req: Request, res: Response, next: NextFunction): void | ApiError => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ApiError(
          `error validating create friend request`,
          httpErrors.BAD_REQUEST,
          errors.array()
        );
      }
      next();
    },
  ],
  checkPasswordWithEmail: [
    query('email')
      .normalizeEmail()
      .isEmail()
      .withMessage('email is incorrect format')
      .exists()
      .withMessage('email is undefined'),
    query('password').exists().isString().withMessage('password is undefined or not a string'),
    (req: Request, res: Response, next: NextFunction): void | ApiError => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ApiError(
          `error validating login details`,
          httpErrors.BAD_REQUEST,
          errors.array()
        );
      }
      next();
    },
  ],
};

export default userValidator;

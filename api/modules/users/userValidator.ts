import { NextFunction, Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
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
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // return res.status(422).json('problem validating');
        throw new ApiError('user id is not defined', httpStatusCodes.BAD_REQUEST);
      }
    },
  ],
  createUser: [
    body('first_name').exists(),
    body('last_name').exists(),
    body('email').normalizeEmail().isEmail(),
    body('')
  ],
  getFriends: [],
  createFriend: [],
  checkPasswordWithEmail: [],
};

export default userValidator;

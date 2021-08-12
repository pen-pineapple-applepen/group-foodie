import { NextFunction, Request, Response } from 'express';
import { check, param, validationResult } from 'express-validator';
import Api404Error from '../../errors/api404Error';

type userMethod =
  | 'getOneUser'
  | 'createUser'
  | 'getFriends'
  | 'createFriend'
  | 'checkPasswordWithEmail';

// function userValidator(method: userMethod): any[] {
//   switch (method) {
//     case 'getOneUser': {
//       return [
//         param('user_id').exists(),
//         (req: Request, res: Response, next: NextFunction) => {
//           const errors = validationResult(req);
//           if (!errors.isEmpty()) {
//             return res.status(422).json('error');
//             next();
//           }
//         },
//       ];
//     }
//     default:
//       return [];
//   }
// }

export const userValidator = {
  getOneUser: [
    param('user_id').exists(),
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // return res.status(422).json('problem validating');
        throw new Api404Error('user id is not defined')
      }
    },
  ],
  createUser: [],
  getFriends: [],
  createFriend: [],
  checkPasswordWithEmail: [],
}


export default userValidator;

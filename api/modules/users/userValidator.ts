import { check, param, validationResult } from 'express-validator';

type userMethod =
  | 'getOneUser'
  | 'createUser'
  | 'getFriends'
  | 'createFriend'
  | 'checkPasswordWithEmail';

function userValidator(method: userMethod) {
  switch (method) {
    case 'getOneUser': {
      return param('user_id').exists();
    }
    default:
      return 'default';
  }
}

export default userValidator;

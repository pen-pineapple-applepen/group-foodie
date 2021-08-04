/* eslint-disable prettier/prettier */
import express from 'express';
import userController from './controller';

const users = express.Router();

users
  .route('/create')
  .post(userController.createUser)

users
  .route('/login')
  .get(userController.checkPasswordWithEmail)

users
  .route('/:user_id')
  .get(userController.getOneUser)


users
  .route('/:user_id/friends')
  .get(userController.getFriends)
  .post(userController.createFriend)

export default users;

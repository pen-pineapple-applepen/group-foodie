/* eslint-disable prettier/prettier */
import express from 'express';
import { UsersController } from './controller';
const usersController = new UsersController();

const users = express.Router();

users
  .route('/create')
  .post(usersController.createUser)

users
  .route('/login')
  .get(usersController.checkPasswordWithEmail)

users
  .route('/:user_id')
  .get(usersController.getOneUser)


users
  .route('/:user_id/friends')
  .get(usersController.getFriends)
  .post(usersController.createFriend)

export default users;

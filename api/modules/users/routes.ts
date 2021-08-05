/* eslint-disable prettier/prettier */
import { Container } from 'typedi';
import express from 'express';
import UsersController from './controller';

// const usersController = new UsersController();
const usersController = Container.get(UsersController)
// console.log('userController instance: ', usersController.getOneUser);

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

/* eslint-disable prettier/prettier */
import { Container } from 'typedi';
import express from 'express';
import UsersControllerImpl from './controller';
import userValidator from './userValidator';
import db from '../../db';

Container.set('DATABASE_ACCESS', db);

// getting controller instance with injected dependency
const usersController = Container.get(UsersControllerImpl)

const users = express.Router();

users
  .route('/')
  .post(userValidator.createUser, usersController.createUser)
  .get(userValidator.getOneUser, usersController.getOneUser)

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

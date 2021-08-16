/* eslint-disable prettier/prettier */
import { Container } from 'typedi';
import express from 'express';
import { UsersControllerImpl } from './controller';
import userValidator from './userValidator';
import db from '../../db';

Container.set('DATABASE_ACCESS', db);

// getting controller instance with injected dependency
const usersController = Container.get(UsersControllerImpl)

const users = express.Router();

users
  .route('/')
  .post(userValidator.createUser, usersController.createUser)
  .get(usersController.getOneUser)

users
  .route('/login')
  .get(userValidator.checkPasswordWithEmail, usersController.checkPasswordWithEmail)

users
  .route('/:user_id')
  .get(userValidator.getOneUser, usersController.getOneUser)

users
  .route('/:user_id/friends')
  .get(userValidator.getFriends, usersController.getFriends)
  .post(userValidator.createFriend, usersController.createFriend)

export default users;

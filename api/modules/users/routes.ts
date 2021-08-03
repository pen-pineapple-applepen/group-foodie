/* eslint-disable prettier/prettier */
import express from 'express';
import usersHandlers from './handlers';

const users = express.Router();

users
  .route('/create')
  .post(usersHandlers.createUser)

users
  .route('/login')
  .get(usersHandlers.checkPasswordWithEmail)

users
  .route('/:user_id')
  .get(usersHandlers.getOneUser)


users
  .route('/:user_id/friends')
  .get(usersHandlers.getFriends)
  .post(usersHandlers.createFriend)

export default users;

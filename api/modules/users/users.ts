const express = require('express');
const controllers = require('../controllers.ts');
const users = express.Router();

users
  .route('/create')
  .post(controllers.createUser)

users
  .route('/login')
  .get(controllers.checkPasswordWithEmail)

users
  .route('/:user_id')
  .get(controllers.getOneUser)


users
  .route('/:user_id/friends')
  .get(controllers.getFriends)
  .post(controllers.createFriend)

module.exports = users;
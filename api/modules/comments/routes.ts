const express = require('express');
const controllers = require('../controllers.ts');
const comments = express.Router();

comments
  .route('/:user_id/create')
  .post(controllers.createComment)

comments
  .route('/:group_id/group')
  .get(controllers.getCommentsByGroupId)

module.exports = comments;
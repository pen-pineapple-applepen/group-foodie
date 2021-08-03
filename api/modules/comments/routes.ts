/* eslint-disable prettier/prettier */
import express from 'express';
import commentsHandlers from './handlers';

const comments = express.Router();

comments
  .route('/:user_id/create')
  .post(commentsHandlers.createComment)

comments
  .route('/:group_id/group')
  .get(commentsHandlers.getCommentsByGroupId)

export default comments;
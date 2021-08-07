/* eslint-disable prettier/prettier */
import express from 'express';
import Container from 'typedi';
import { CommentsControllerImpl } from './controller';

const commentsController = Container.get(CommentsControllerImpl);

const comments = express.Router();

comments
  .route('/:user_id/create')
  .post(commentsController.createComment)

comments
  .route('/:group_id/group')
  .get(commentsController.getCommentsByGroupId)

export default comments;
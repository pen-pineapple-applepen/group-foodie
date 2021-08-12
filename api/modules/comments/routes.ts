/* eslint-disable prettier/prettier */
import express from 'express';
import Container from 'typedi';
import { CommentsControllerImpl } from './controller';

const commentsController = Container.get(CommentsControllerImpl);

const comments = express.Router();

comments
  .route('/')
  .get(commentsController.getComments)
  .post(commentsController.createComment)

export default comments;
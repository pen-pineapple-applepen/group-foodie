/* eslint-disable prettier/prettier */
import express from 'express';
import { Container } from 'typedi';
import { GroupsControllerImpl } from './controller';

const groupsController = Container.get(GroupsControllerImpl);
const groups = express.Router();

groups
  .route('/:group_id/')
  .get(groupsController.getDueDateByGroupId)

groups
  .route('/')
  .post(groupsController.createGroup)

export default groups;
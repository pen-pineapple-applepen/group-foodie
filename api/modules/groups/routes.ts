/* eslint-disable prettier/prettier */
import express from 'express';
import groupsHandlers from './handlers';

const groups = express.Router();

groups
  .route('/:group_id/')
  .get(groupsHandlers.getDueDateByGroupId)

groups
  .route('/')
  .post(groupsHandlers.createGroup)

export default groups;
const express = require('express');
const controllers = require('../controllers.ts');
const groups = express.Router();

groups
  .route('/:group_id/')
  .get(controllers.getDueDateByGroupId)

groups
  .route('/')
  .post(controllers.createGroup)

module.exports = groups;
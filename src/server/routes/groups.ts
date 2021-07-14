const express = require('express');
const controllers = require('../controllers.ts');
const groups = express.Router();

groups
  .route('/')
  .post(controllers.createGroup)

module.exports = groups;
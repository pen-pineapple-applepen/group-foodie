const express = require('express');
const users = express.Router();

users
  .route('/')
  .get((req, res) => {
    res.status(200).send('hello from users')
  })

  module.exports = users;
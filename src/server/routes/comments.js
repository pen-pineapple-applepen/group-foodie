const express = require('express');
const comments = express.Router();

comments
  .route('/')
  .get((req, res) => {
    res.status(200).send('hello from comments')
  })

  module.exports = comments;
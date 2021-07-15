const express = require('express');
const orders = express.Router();

orders
  .route('/')
  .get((req, res) => {
    res.status(200).send('hello from orders')
  })

  module.exports = orders;
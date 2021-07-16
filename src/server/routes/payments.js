const express = require('express');
const payments = express.Router();

payments
  .route('/')
  .get((req, res) => {
    res.status(200).send('hello from payments')
  })

  module.exports = payments;
const express = require('express');
const controllers = require('../controllers.ts');
const payments = express.Router();

payments
  .route('/:user_id')
  .get(controllers.getPaymentsByUserId)
  .post(controllers.addPaymentByUserId)

module.exports = payments;
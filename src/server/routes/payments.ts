const express = require('express');
const controllers = require('../controllers.ts');
const payments = express.Router();

payments
  .route('/addPayment')
  .post(controllers.addPaymentByUserId)
payments
  .route('/user/:user_id')
  .get(controllers.getPaymentsByUserId)

module.exports = payments;
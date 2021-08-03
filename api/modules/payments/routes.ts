/* eslint-disable prettier/prettier */
import express from'express';
import paymentsHandlers from'./handlers.ts';

const payments = express.Router();

payments
  .route('/addPayment/:user_id')
  .post(paymentsHandlers.addPaymentByUserId)
payments
  .route('/user/:user_id')
  .get(paymentsHandlers.getPaymentsByUserId)

export default payments;
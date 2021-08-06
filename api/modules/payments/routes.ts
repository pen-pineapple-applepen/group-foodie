/* eslint-disable prettier/prettier */
import express from'express';
import Container from 'typedi';
import { PaymentsControllerImpl } from'./controller';

const paymentsController = Container.get(PaymentsControllerImpl);

const payments = express.Router();

payments
  .route('/:user_id/user')
  .post(paymentsController.addPaymentByUserId)

payments
  .route('/:user_id/user')
  .get(paymentsController.getPaymentsByUserId)

export default payments;
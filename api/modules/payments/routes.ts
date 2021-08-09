/* eslint-disable prettier/prettier */
import express from'express';
import Container from 'typedi';
import { PaymentsControllerImpl } from'./controller';

const paymentsController = Container.get(PaymentsControllerImpl);

const payments = express.Router();

payments
  .route('/:user_id/user')

  payments
  .route('/')
  .post(paymentsController.addPayment)
  .get(paymentsController.getPayments)

export default payments;
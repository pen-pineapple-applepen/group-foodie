/* eslint-disable prettier/prettier */
import express from 'express';
import ordersHandlers from './handlers.ts';

const orders = express.Router();

orders
  .route('/:order_id')
  .get(ordersHandlers.getOneOrderById)

orders
  .route('/:group_id/group')
  .get(ordersHandlers.getOrdersByGroupId)

orders
  .route('/:user_id/user')
  .get(ordersHandlers.getOrdersByUserId)
  .post(ordersHandlers.addOrder)

export default orders;
/* eslint-disable prettier/prettier */
import express from 'express';
import Container from 'typedi';
import { OrdersControllerImpl } from './controller';

const ordersController = Container.get(OrdersControllerImpl)

const orders = express.Router();

orders
  .route('/:order_id')
  .get(ordersController.getOneOrderById)

orders
  .route('/:group_id/group')
  .get(ordersController.getOrdersByGroupId)

orders
  .route('/:user_id/user')
  .get(ordersController.getOrdersByUserId)
  .post(ordersController.addOrder)

export default orders;
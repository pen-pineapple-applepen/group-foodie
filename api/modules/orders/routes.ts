/* eslint-disable prettier/prettier */
import express from 'express';
import Container from 'typedi';
import { OrdersControllerImpl } from './controller';

const ordersController = Container.get(OrdersControllerImpl)

const orders = express.Router();

orders
  .route('/')
  .get(ordersController.getOrders)
  .post(ordersController.addOrder)

orders
  .route('/:order_id')
  .get(ordersController.getOneOrderById)


export default orders;
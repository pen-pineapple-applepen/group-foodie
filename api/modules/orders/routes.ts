const express = require('express');
const controllers = require('../controllers.ts');
const orders = express.Router();

orders
  .route('/:order_id')
  .get(controllers.getOneOrderById)

orders
  .route('/:group_id/group')
  .get(controllers.getOrdersByGroupId)

orders
  .route('/:user_id/user')
  .get(controllers.getOrdersByUserId)
  .post(controllers.addOrder)

module.exports = orders;
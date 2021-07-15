const express = require('express');
const restaurants = express.Router();
const controllers = require('../controllers.ts');

restaurants
  .route('/:zip_code')
  .get(controllers.getRestaurantsByZipCode)

restaurants
  .route('/:restaurant_id/menu')
  .get(controllers.getMenuByRestaurantId)

module.exports = restaurants;
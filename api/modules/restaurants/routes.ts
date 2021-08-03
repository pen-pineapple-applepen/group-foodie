/* eslint-disable prettier/prettier */
import express from'express';
import restaurantsHandlers from'../handlers';

const restaurants = express.Router();

restaurants
  .route('/:zip_code')
  .get(restaurantsHandlers.getRestaurantsByZipCode)

restaurants
  .route('/:restaurant_id/menu')
  .get(restaurantsHandlers.getMenuByRestaurantId)

export default restaurants;
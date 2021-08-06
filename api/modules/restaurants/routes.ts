/* eslint-disable prettier/prettier */
import express from'express';
import { Container } from 'typedi';
import RestaurantsControllerImpl from './controller';

// getting controller instance with injected dependency
const restaurantsController = Container.get(RestaurantsControllerImpl);

const restaurants = express.Router();

restaurants
  .route('/:zip_code')
  .get(restaurantsController.getRestaurantsByZipCode)

restaurants
  .route('/:restaurant_id/menu')
  .get(restaurantsController.getMenuByRestaurantId)

export default restaurants;
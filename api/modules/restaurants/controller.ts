import { Request, Response } from 'express';
import { RestaurantsServiceImpl } from './service';

const restaurantsService = new RestaurantsServiceImpl();

async function getRestaurantsByZipCode(req: Request, res: Response) {
  let { zip_code } = req.params;
  let zipCode = Number(zip_code);
  try {
    const restaurants = await restaurantsService.getRestaurantsByZipcode((zipCode = 90045));
    res.status(200).send(restaurants);
  } catch (err) {
    res.status(400).send(err);
  }
}

async function getMenuByRestaurantId(req: Request, res: Response) {
  let { restaurant_id } = req.params;
  try {
    const menus = await restaurantsService.getMenuByRestaurantId(Number(restaurant_id));
    console.log('successfully got menus');
    res.status(200).send(menus);
  } catch (err) {
    console.log('error getting restaurant: ', err);
    res.status(400).send(err);
  }
}

export default {
  getRestaurantsByZipCode,
  getMenuByRestaurantId,
};

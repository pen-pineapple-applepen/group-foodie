import { Request, Response } from 'express';
import { Service } from 'typedi';
import { RestaurantsServiceImpl } from './service';

interface RestaurantsController {
  getRestaurantsByZipCode(req: Request, res: Response): Promise<void>;
  getMenuByRestaurantId(req: Request, res: Response): Promise<void>;
}
@Service()
export default class RestaurantsControllerImpl implements RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsServiceImpl) {}

  getRestaurantsByZipCode = async (req: Request, res: Response) => {
    const { zip_code } = req.params;
    let zipCode = Number(zip_code);
    try {
      const restaurants = await this.restaurantsService.getRestaurantsByZipcode((zipCode = 90045));
      res.status(200).send(restaurants);
    } catch (err) {
      res.status(400).send(err);
    }
  };

  getMenuByRestaurantId = async (req: Request, res: Response) => {
    const { restaurant_id } = req.params;
    try {
      const menus = await this.restaurantsService.getMenuByRestaurantId(Number(restaurant_id));
      console.log('successfully got menus');
      res.status(200).send(menus);
    } catch (err) {
      console.log('error getting restaurant: ', err);
      res.status(400).send(err);
    }
  };
}

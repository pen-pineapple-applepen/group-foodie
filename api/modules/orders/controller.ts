import { Request, Response } from 'express';
import { Service } from 'typedi';
import { OrdersServiceImpl } from './service';

export interface OrdersController {
  getOneOrderById(req: Request, res: Response): Promise<void>;
  getOrdersByGroupId(req: Request, res: Response): Promise<void>;
  getOrdersByUserId(req: Request, res: Response): Promise<void>;
  addOrder(req: Request, res: Response): Promise<void>;
}

@Service()
export class OrdersControllerImpl implements OrdersController {
  constructor(private readonly ordersService: OrdersServiceImpl) {}

  getOneOrderById = async (req: Request, res: Response): Promise<void> => {
    const { order_id } = req.params;
    try {
      const order = await this.ordersService.getOneOrderById(Number(order_id));
      res.status(200).send(order);
    } catch (err) {
      console.log('error getting order by ID: ', err);
      res.status(404).send(err);
    }
  };

  getOrdersByGroupId = async (req: Request, res: Response): Promise<void> => {
    const { group_id } = req.params;
    try {
      const orders = await this.ordersService.getOrdersByGroupId(Number(group_id));
      res.status(200).send(orders);
    } catch (err) {
      console.log('error getting order by group ID: ', err);
      res.status(404).send(err);
    }
  };

  getOrdersByUserId = async (req: Request, res: Response): Promise<void> => {
    const { user_id } = req.params;
    try {
      const orders = await this.ordersService.getOrdersByUserId(Number(user_id));
      res.status(200).send(orders);
    } catch (err) {
      console.log('error getting order by User ID: ', err);
      res.status(404).send(err);
    }
  };

  addOrder = async (req: Request, res: Response): Promise<void> => {
    const { user_id } = req.params;
    const { food, quantity, price, date, food_id, group_id, restaurant_id, live } = req.body;

    try {
      const orderId = await this.ordersService.addOrder(
        Number(user_id),
        food,
        quantity,
        price,
        date,
        food_id,
        group_id,
        restaurant_id,
        live
      );
      console.log(`successfully added order with ID: ${orderId} and userID: ${user_id}`);
      res.status(200).send(orderId);
    } catch (err) {
      console.log('error creating order: ', err);
      res.status(404).send(err);
    }
  };
}

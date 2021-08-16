import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import { OrdersServiceImpl } from './service';

export interface OrdersController {
  getOneOrderById(req: Request, res: Response, next: NextFunction): Promise<void>;
  getOrders(req: Request, res: Response, next: NextFunction): Promise<void>;
  // getOrdersByUserId(req: Request, res: Response): Promise<void>;
  addOrder(req: Request, res: Response, next: NextFunction): Promise<void>;
}

@Service()
export class OrdersControllerImpl implements OrdersController {
  constructor(private readonly ordersService: OrdersServiceImpl) {}

  getOneOrderById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { order_id } = req.params;
    try {
      const order = await this.ordersService.getOneOrderById(Number(order_id));
      res.status(200).send(order);
    } catch (err) {
      console.log('error getting order by ID: ', err);
      next(err);
    }
  };

  getOrders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const group_id = req.query.group_id || undefined;
    const user_id = req.query.user_id || undefined;
    try {
      const orders = await this.ordersService.getOrders(Number(group_id), Number(user_id));
      res.status(200).send(orders);
    } catch (err) {
      console.log('error getting order by group ID: ', err);
      next(err);
    }
  };

  addOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { user_id, food, quantity, price, date, food_id, group_id, restaurant_id, live } = req.body;
    try {
      const orderId = await this.ordersService.addOrder(
        user_id,
        food,
        quantity,
        price,
        date,
        food_id,
        group_id,
        restaurant_id,
        live
      );
      res.status(200).send(orderId);
    } catch (err) {
      console.log('error creating order: ', err);
      next(err);
    }
  };
}

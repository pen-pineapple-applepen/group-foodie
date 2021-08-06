import { Knex } from 'knex';
import { Inject, Service } from 'typedi';
import { OrderDTO } from './dto';

export interface OrdersService {
  getOneOrderById(order_id: number): Promise<OrderDTO>;
  getOrdersByGroupId(group_id: number): Promise<OrderDTO[]>;
  getOrdersByUserId(user_id: number): Promise<OrderDTO[]>;
  addOrder(
    user_id: number,
    food: string,
    quantity: number,
    price: number,
    date: string,
    food_id: number,
    group_id: number,
    restaurant_id: number,
    live: boolean
  ): Promise<number[]>;
}

@Service()
export class OrdersServiceImpl implements OrdersService {
  constructor(
    @Inject('DATABASE_ACCESS')
    private readonly db: Knex
  ) {}

  getOneOrderById = async (order_id: number): Promise<OrderDTO> => {
    const [order] = await this.db('orders').where({ id: order_id });
    return order;
  };

  getOrdersByGroupId = async (group_id: number): Promise<OrderDTO[]> => {
    const orders = await this.db('orders').where({ group_id });
    return orders;
  };

  getOrdersByUserId = async (user_id: number): Promise<OrderDTO[]> => {
    const orders = await this.db('orders').where({ user_id });
    return orders;
  };

  addOrder = async (
    user_id: number,
    food: string,
    quantity: number,
    price: number,
    date: string,
    food_id: number,
    group_id: number,
    restaurant_id: number,
    live: boolean
  ): Promise<number[]> => {
    const insertedId = await this.db('orders').insert(
      {
        user_id,
        food,
        quantity,
        price,
        date,
        food_id,
        group_id,
        restaurant_id,
        live,
      },
      'id'
    );
    return insertedId;
  };
}

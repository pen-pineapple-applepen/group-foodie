import { Knex } from 'knex';
import { Inject, Service } from 'typedi';
import { OrderDTO } from './dto';
import OrdersMapper from './mapper';

export interface OrdersService {
  getOneOrderById(order_id: number): Promise<OrderDTO>;
  getOrders(group_id: number, user_id: number): Promise<OrderDTO[]>;
  // getOrdersByUserId(user_id: number): Promise<OrderDTO[]>;
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
    const orderDTO = OrdersMapper.toOrderDTO(order);
    return orderDTO;
  };

  getOrders = async (group_id?: number, user_id?: number): Promise<OrderDTO[]> => {
    const orders = await this.db('orders').where((qb) => {
      if (group_id) {
        qb.where({ group_id });
      }
      if (user_id) {
        qb.where({ user_id });
      }
    });
    const ordersDTO = OrdersMapper.toOrdersDTO(orders);
    return ordersDTO;
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
    const insertedIdDTO = OrdersMapper.toInsertedIdDTO(insertedId);
    return insertedIdDTO;
  };
}

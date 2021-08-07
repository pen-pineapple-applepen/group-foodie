import { OrderDTO } from './dto';
import { Order } from './types';

export default class OrdersMapper {
  static toOrderDTO(order: Order): OrderDTO {
    return {
      id: order.id,
      user_id: order.user_id,
      food: order.food,
      quantity: order.quantity,
      price: order.price,
      date: order.date,
      food_id: order.food_id,
      group_id: order.group_id,
      restaurant_id: order.restaurant_id,
      live: order.live,
    };
  }

  static toOrdersDTO(orders: Order[]): OrderDTO[] {
    return orders.map((order) => {
      return this.toOrderDTO(order);
    });
  }

  static toInsertedIdDTO(insertedId: number[]): number[] {
    return insertedId;
  }
}
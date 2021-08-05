import db from '../../db';

const getOneOrderById = async (order_id: number) => {
  const order = await db('orders').where({ id: order_id });
  return order;
};

const getOrdersByGroupId = async (group_id: number) => {
  const orders = await db('orders').where({ group_id });
  return orders;
};

const getOrdersByUserId = async (user_id: number) => {
  const orders = await db('orders').where({ user_id });
  return orders;
};

const addOrder = async (
  user_id: number,
  food: string,
  quantity: number,
  price: number,
  date: string,
  food_id: number,
  group_id: number,
  restaurant_id: number,
) => {
  const insertedId = await db('orders').insert(
    {
      user_id,
      food,
      quantity,
      price,
      date,
      food_id,
      group_id,
      restaurant_id,
    },
    'id'
  );
  return insertedId;
};

export default {
  getOneOrderById,
  getOrdersByGroupId,
  getOrdersByUserId,
  addOrder,
};

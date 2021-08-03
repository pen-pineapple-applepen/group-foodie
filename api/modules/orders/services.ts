import db from '../../db';

const getOneOrderById = async (order_id) => {
  const order = await db('orders').where({ id: order_id });
  return order;
};

const getOrdersByGroupId = async (group_id) => {
  const orders = await db('orders').where({ group_id });
  return orders;
};

const getOrdersByUserId = async (user_id) => {
  const orders = await db('orders').where({ user_id });
  return orders;
};

const addOrder = async (
  user_id,
  food,
  quantity,
  price,
  date,
  food_id,
  group_id,
  restaurant_id,
  live
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
      live,
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

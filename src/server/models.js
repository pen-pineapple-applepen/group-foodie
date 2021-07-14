const db = require('./db');

// user friends
const getOneUserInfo = async (user_id) => {
  const user = await db('users')
    .select('id', 'first_name', 'last_name', 'email', 'username', 'password', 'guest')
    .where({ id: user_id })

  return user[0];
}

const getFriends = async (user_id) => {
  const friends = await db.select(
    'users.id as id', 'first_name', 'last_name', 'email', 'password', 'guest'
  ).from('users')
  .join('friends_join_table', function() {
    this.on('friends_join_table.friend_id', '=', 'users.id')
    .andOn('friends_join_table.user_id', '=', user_id)
  })

  return friends;
}

// orders
const getOneOrderById = async (order_id) => {
  const order = await db('orders')
    .where({ id: order_id })
  return order;
}

const getOrdersByGroupId = async (group_id) => {
  const orders = await db('orders')
    .where({ group_id: group_id })
  return orders
}

const getOrdersByUserId = async (user_id) => {
  const orders = await db('orders')
    .where({ user_id: user_id })
  return orders
}

const addOrder = async (
  user_id, food, quantity, price, date, food_id, group_id, restaurant_id
) => {
  await db('orders')
    .insert({
      user_id,
      food,
      quantity,
      price,
      date,
      food_id,
      group_id,
      restaurant_id,
    })
}

const models = {
  getOneUserInfo,
  getFriends,
  getOneOrderById,
  getOrdersByGroupId,
  getOrdersByUserId,
  addOrder,
}

module.exports = models;
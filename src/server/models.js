const db = require('./db');

// user friends
const getOneUserInfo = async (user_id) => {
  const user = await db('users')
    .select('id', 'first_name', 'last_name', 'email', 'username', 'password', 'guest')
    .where({ id: user_id })
  return user[0];
}

const createUser = async(first_name, last_name, email, username, password, guest) => {
  await db('users')
    .insert({
      first_name,
      last_name,
      email,
      username,
      password,
      guest,
    })
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

const createFriend = async(user_id, friend_id) => {
  await db('friends_join_table')
    .insert({
      user_id,
      friend_id,
    })
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

// payments
const getPaymentsByUserId = async (user_id) => {
  const payments = await db('payment_info')
    .where({ user_id: user_id })
  return payments;
}

const addPaymentByUserId = async (
  user_id, name, card_number, card_type, exp_date, cvv, zip_code
) => {
  await db('payment_info')
    .insert({
      name,
      card_number,
      card_type,
      exp_date,
      cvv,
      zip_code,
      user_id,
    })
}

//groups
const createGroup = async (due_date) => {
  await db('groups')
    .insert({
      due_date,
    })
}

// comments
const createComment = async (user_id, text, date, group_id) => {
  await db('comments')
    .insert({
      user_id,
      text,
      date,
      group_id,
    })
}


const models = {
  getOneUserInfo,
  createUser,
  getFriends,
  createFriend,
  getOneOrderById,
  getOrdersByGroupId,
  getOrdersByUserId,
  addOrder,
  getPaymentsByUserId,
  addPaymentByUserId,
  createGroup,
  createComment
}

module.exports = models;
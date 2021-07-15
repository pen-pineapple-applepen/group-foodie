const db = require('./db');
const restaurants = require('./restaurants');
const menus = require('./menus');

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
  const insertedId = await db('orders')
    .insert({
      user_id,
      food,
      quantity,
      price,
      date,
      food_id,
      group_id,
      restaurant_id,
    }, 'id')
    return insertedId;
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
  const insertedId = await db('payment_info')
    .insert({
      name,
      card_number,
      card_type,
      exp_date,
      cvv,
      zip_code,
      user_id,
    }, 'id')
  return insertedId;
}

//groups
const getDueDateByGroupId = async (group_id) => {
  const dueDate = await db('groups')
    .where({
      id: group_id,
    })
    return dueDate;
}
const createGroup = async (due_date) => {
  const idDate = await db('groups')
    .insert({
      due_date,
    }, ['id', 'due_date'])
    return idDate;
}

// comments

const getCommentsByGroupId = async (group_id) => {
  const comments = await db('comments')
    .where({ group_id: group_id })
  return comments;
}

const createComment = async (user_id, text, date, group_id) => {
  const insertedId = await db('comments')
    .insert({
      user_id,
      text,
      date,
      group_id,
    }, 'id')
  return insertedId;
}

const getRestaurantsByZipCode = async (zip_code) => {
  const restaurantsData = restaurants.restaurants;

  const allRestaurants = restaurantsData.reduce((acc, restaurant) => {
    const formattedRestaurant = {}
    formattedRestaurant.name = restaurant.restaurant_name;
    formattedRestaurant.street = restaurant.address.formatted;
    formattedRestaurant.cuisines = [restaurant.cuisines];
    formattedRestaurant.hours = restaurant.hours;
    acc.push(formattedRestaurant)
    return acc;

  }, [])
  return allRestaurants;
}

const getMenuByRestaurantId = async (restaurant_id) => {
  const menusData = menus.menus;
  const currentRestaurant = menusData.find(menu => menu.restaurant_id === Number(restaurant_id));
  const menuItems = currentRestaurant.menu_items;

  return menuItems;
}

const checkPasswordWithEmail = async (email, password) => {
  const emailsThatMatchPassword = await db.select('email').from('users')
    .where({ email, password })

  return emailsThatMatchPassword.length ? true : false;

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
  getDueDateByGroupId,
  createGroup,
  getCommentsByGroupId,
  createComment,
  getRestaurantsByZipCode,
  getMenuByRestaurantId,
  checkPasswordWithEmail,
}

module.exports = models;
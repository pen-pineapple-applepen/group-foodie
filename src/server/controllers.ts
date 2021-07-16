const db = require('./db');
const models = require('./models');

// users
async function getOneUser(req, res) {
  const { user_id } = req.params;
  try {
    const user = await models.getOneUserInfo(Number(user_id))
    res.status(200).send(user);
  } catch (err) {
    console.log('error getting one user: ', err)
    res.status(404).send(err);
  }
}

async function createUser(req, res) {
  const {
    first_name, last_name, email, username, password, guest
  } = req.body;
  try {
    const user = await models.createUser(first_name, last_name, email, username, password, guest);
    res.status(200).send('created user');
  } catch (err) {
    console.log('error creating user: ', err)
    res.status(404).send(err);
  }
}

async function getFriends(req, res) {
  const { user_id } = req.params;
  try {
    const friends = await models.getFriends(Number(user_id))
    res.status(200).send(friends)
  } catch (err) {
    console.log('error getting friends: ', err);
    res.status(404).send(err);
  }
}

async function createFriend(req, res) {
  const { user_id } = req.params;
  const { friend_id } = req.body;
  try {
    await models.createFriend(user_id, friend_id);
    res.status(200).send('created friend')
  } catch (err) {
    console.log('error creating friend: ', err);
    res.status(404).send(err);
  }
}

//orders
async function getOneOrderById(req, res) {
  const { order_id } = req.params;
  try {
    const order = await models.getOneOrderById(Number(order_id))
    res.status(200).send(order)
  } catch (err) {
    console.log('error getting order by ID: ', err);
    res.status(404).send(err);
  }
}

async function getOrdersByGroupId(req, res) {
  const { group_id } = req.params;
  try {
    const orders = await models.getOrdersByGroupId(Number(group_id))
    res.status(200).send(orders)
  } catch (err) {
    console.log('error getting order by group ID: ', err);
    res.status(404).send(err);
  }
}

async function getOrdersByUserId(req, res) {
  const { user_id } = req.params;
  try {
    const orders = await models.getOrdersByUserId(Number(user_id))
    res.status(200).send(orders)
  } catch (err) {
    console.log('error getting order by User ID: ', err);
    res.status(404).send(err);
  }
}

async function addOrder(req, res) {
  const { user_id } = req.params;
  const {
    food, quantity, price, date, food_id, group_id, restaurant_id
  } = req.body;

  try {
    const orderId = await models.addOrder(
      user_id, food, quantity, price, date, food_id, group_id, restaurant_id
    )
    res.status(200).send(orderId);
  } catch (err) {
    console.log('error creating order: ', err);
    res.status(404).send(err);
  }
}

// payments
async function getPaymentsByUserId(req, res) {
  const { user_id } = req.params;
  try {
    const payments = await models.getPaymentsByUserId(user_id)
    res.status(200).send(payments);
  } catch (err) {
    res.status(404).send(err);
  }
}
async function addPaymentByUserId(req, res) {
  const { user_id } = req.params;
  const { name, card_number, card_type, exp_date, cvv, zip_code } = req.body;
  try {
    const paymentId = await models.addPaymentByUserId(
      user_id, name, card_number, card_type, exp_date, cvv, zip_code
    )
    res.status(200).send(paymentId);
  } catch (err) {
    res.status(404).send(err);
  }
}

// groups


async function getDueDateByGroupId(req, res) {
  const { group_id } = req.params;
  try {
    const dueDate = await models.getDueDateByGroupId(group_id)
    res.status(200).send(dueDate);
  } catch (err) {
    res.status(404).send(err);
  }
}
async function createGroup(req, res) {
  const { due_date } = req.body;
  try {
    const idAndDate = await models.createGroup(due_date)
    res.status(200).send(idAndDate);
  } catch (err) {
    res.status(404).send(err);
  }
}

// comments
async function getCommentsByGroupId(req, res) {
  const { group_id } = req.params;
  try {
    const comments = await models.getCommentsByGroupId(group_id)
    res.status(200).send(comments);
  } catch (err) {
    res.status(404).send(err);
  }
}

async function createComment(req, res) {
  const { user_id } = req.params;
  const { text, date, group_id } = req.body;
  try {
    const insertedId = await models.createComment(user_id, text, date, group_id)
    res.status(200).send(insertedId)
  } catch (err) {
    console.log('failed making comment', err);
    res.status(400).send(err);
  }
}

// restaurants
async function getRestaurantsByZipCode(req, res) {
  let { zip_code } = req.params;
  try {
    const restaurants = await models.getRestaurantsByZipCode(zip_code = 90045)
    res.status(200).send(restaurants);
  } catch (err) {
    res.status(400).send(err);
  }
}

async function getMenuByRestaurantId(req, res) {
  let { restaurant_id } = req.params;
  try {
    const menus = await models.getMenuByRestaurantId(restaurant_id)
    console.log('successfully got menus');
    res.status(200).send(menus);
  } catch (err) {
    console.log('error getting restaurant: ', err)
    res.status(400).send(err);
  }
}

async function checkPasswordWithEmail(req, res) {
  console.log("req.query:", req.query);
  let { email, password } = req.query;
  try {
    const passwordIsCorrect = await models.checkPasswordWithEmail(email, password)
    console.log('password checks out');
    res.status(200).send(passwordIsCorrect);
  } catch (err) {
    console.log('error getting restaurant: ', err)
    res.status(400).send(err);
  }
}


module.exports = {
  getOneUser,
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
  checkPasswordWithEmail
}
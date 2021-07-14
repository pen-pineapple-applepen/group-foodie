
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
    await models.addOrder(
      user_id, food, quantity, price, date, food_id, group_id, restaurant_id
    )
    res.status(200).send('successfully added order');
  } catch (err) {
    console.log('error creating order: ', err);
    res.status(404).send(err);
  }
}



module.exports = {
  getOneUser,
  getFriends,
  getOneOrderById,
  getOrdersByGroupId,
  getOrdersByUserId,
  addOrder,
}
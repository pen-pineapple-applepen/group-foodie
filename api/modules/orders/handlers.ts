import ordersServices from './services.ts';

async function getOneOrderById(req, res) {
  const { order_id } = req.params;
  try {
    const order = await ordersServices.getOneOrderById(Number(order_id))
    res.status(200).send(order)
  } catch (err) {
    console.log('error getting order by ID: ', err);
    res.status(404).send(err);
  }
}

async function getOrdersByGroupId(req, res) {
  const { group_id } = req.params;
  try {
    const orders = await ordersServices.getOrdersByGroupId(Number(group_id))
    res.status(200).send(orders)
  } catch (err) {
    console.log('error getting order by group ID: ', err);
    res.status(404).send(err);
  }
}

async function getOrdersByUserId(req, res) {
  const { user_id } = req.params;
  try {
    const orders = await ordersServices.getOrdersByUserId(Number(user_id))
    res.status(200).send(orders)
  } catch (err) {
    console.log('error getting order by User ID: ', err);
    res.status(404).send(err);
  }
}

async function addOrder(req, res) {
  const { user_id } = req.params;
  const {
    food, quantity, price, date, food_id, group_id, restaurant_id, live
  } = req.body;

  try {
    const orderId = await ordersServices.addOrder(
      user_id, food, quantity, price, date, food_id, group_id, restaurant_id, live
    )
    console.log(`successfully added order with ID: ${orderId} and userID: ${user_id}`)
    res.status(200).send(orderId);
  } catch (err) {
    console.log('error creating order: ', err);
    res.status(404).send(err);
  }
}

export default {
  getOneOrderById,
  getOrdersByGroupId,
  getOrdersByUserId,
  addOrder,
}
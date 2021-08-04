const db = require('./db');
const models = require('./models');














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
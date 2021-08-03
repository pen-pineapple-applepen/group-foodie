const db = require('../db');
const restaurants = require('../restaurants');
const menus = require('../menus');















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
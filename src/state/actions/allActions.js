import { setCurrentUser, logIn, logOut } from '../reducers/currentUserReducer';
import { addName, setNumber } from '../reducers/namesReducer';

import {
  addItem,
  subtractItem,
  updateMenuItemPrice,
  updateMenuItemDescription,
  resetMenuItemQuantity,
} from '../reducers/itemReducer';
import {
  addItemToOrders,
  addToPriceTotal,
  resetAllOrders,
  updateItemName,
  updateItemId,
  updateItemQuantity,
  updateTotalPrice,
  updateRestaurantId,
  setUserId,
  setGroupId,
} from '../reducers/ordersReducer';
import {
  updateCurrentRestaurantId,
  updateCurrentRestaurantName,
} from '../reducers/restaurantReducer';
import { addFriendName } from '../reducers/friendReducer';
import { updateCurrentGroup } from '../reducers/groupReducer';
import {
  createPaymentsList,
  purgePaymentsList,
  changeSelectedPayment,
  addPayment,
} from '../reducers/paymentsReducer';
import { addEmail, removeEmail, resetEmails } from '../reducers/emailFriendsReducer';

const allActions = {
  addName,
  setCurrentUser,
  logIn,
  logOut,
  addItem,
  addToPriceTotal,
  addItemToOrders,
  updateMenuItemPrice,
  updateMenuItemDescription,
  resetMenuItemQuantity,
  subtractItem,
  updateItemName,
  updateItemId,
  updateItemQuantity,
  updateTotalPrice,
  updateRestaurantId,
  updateCurrentRestaurantName,
  updateCurrentRestaurantId,
  resetAllOrders,
  addFriendName,
  setUserId,
  updateCurrentGroup,
  setGroupId,
  createPaymentsList,
  purgePaymentsList,
  changeSelectedPayment,
  addPayment,
  addEmail,
  removeEmail,
  resetEmails,
};

export default allActions;

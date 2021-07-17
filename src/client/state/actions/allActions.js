import { setCurrentUser } from '../reducers/currentUserReducer';
import { addName, setNumber } from '../reducers/namesReducer';
import { logIn, logOut, setCurrentUserId } from '../reducers/loginReducer.js'
import { addItem, subtractItem, UpdateItemPrice, UpdateItemDescription, resetItemQuantity } from '../reducers/menuItemReducer';
import { UpdateItemName, UpdateItemId, UpdateItemQuantity, UpdateTotalPrice, UpdateRestaurantId, setUserId, setGroupId } from '../reducers/orderItemReducer';
import { addItemToOrders, addToPriceTotal, resetAllOrders } from '../reducers/allOrderItemsReducer';
import { updateCurrentRestaurantId, updateCurrentRestaurantName } from '../reducers/restaurantReducer';
import { addFriendName } from '../reducers/friendReducer'
import { updateCurrentGroup } from '../reducers/groupReducer';
import { createPaymentsList, addSelectedPayment} from '../reducers/paymentsReducer';

const allActions = {
  addName,
  // addEmail,
  setCurrentUser,
  logIn,
  logOut,
  addItem,
  addToPriceTotal,
  addItemToOrders,
  UpdateItemPrice,
  UpdateItemDescription,
  resetItemQuantity,
  subtractItem,
  UpdateItemName,
  UpdateItemId,
  UpdateItemQuantity,
  UpdateTotalPrice,
  UpdateRestaurantId,
  updateCurrentRestaurantName,
  updateCurrentRestaurantId,
  resetAllOrders,
  addFriendName,
  setUserId,
  updateCurrentGroup,
  setGroupId,
<<<<<<< HEAD
  setCurrentUserId,
=======
  createPaymentsList,
  addSelectedPayment
>>>>>>> ef7554a227bf98a6f3bb8513868954688a74e2f6
}

export default allActions;
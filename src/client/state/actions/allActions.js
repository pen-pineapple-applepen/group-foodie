import { addName, setNumber } from '../reducers/namesReducer';
import { logIn, logOut } from '../reducers/loginReducer.js'
import { addItem, subtractItem, UpdateItemPrice, UpdateItemDescription, resetItemQuantity } from '../reducers/menuItemReducer';
import { UpdateItemName, UpdateItemId, UpdateItemQuantity, UpdateTotalPrice, UpdateRestaurantId } from '../reducers/orderItemReducer';
import { addItemToOrders, addToPriceTotal, resetAllOrders } from '../reducers/allOrderItemsReducer';
import { updateCurrentRestaurantId, updateCurrentRestaurantName } from '../reducers/restaurantReducer';
import { addFriendName } from '../reducers/friendReducer'

const allActions = {
  addName,
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

}

export default allActions;
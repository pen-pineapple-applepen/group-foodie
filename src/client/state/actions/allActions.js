import { addName, addUserName, setNumber } from '../reducers/namesReducer';
import { setCurrentUser } from '../reducers/currentUserReducer';
import { addItem, subtractItem, UpdateItemPrice, UpdateItemDescription, resetItemQuantity } from '../reducers/menuItemReducer';
import { UpdateItemName, UpdateItemId, UpdateItemQuantity, UpdateTotalPrice, UpdateRestaurantId } from '../reducers/orderItemReducer';
import { addItemToOrders, addToPriceTotal } from '../reducers/allOrderItemsReducer';

const allActions = {
  addName,
  // addEmail,
  setCurrentUser,
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
}

export default allActions;
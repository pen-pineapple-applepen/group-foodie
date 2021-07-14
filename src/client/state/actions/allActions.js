import { addName, addUserName, setNumber } from '../reducers/namesReducer';
import { addItem, subtractItem, UpdateItemPrice, UpdateItemDescription } from '../reducers/menuItemReducer';
import { UpdateItemName, UpdateItemId, UpdateItemQuantity, UpdateTotalPrice, UpdateRestaurantId } from '../reducers/orderItemReducer';
import { addItemToOrders, addToPriceTotal } from '../reducers/allOrderItemsReducer';

const allActions = {
  addName,
  addEmail,
  addItem,
  addToPriceTotal,
  addItemToOrders,
  UpdateItemPrice,
  UpdateItemDescription,
  subtractItem,
  UpdateItemName,
  UpdateItemId,
  UpdateItemQuantity,
  UpdateTotalPrice,
  UpdateRestaurantId,
}

export default allActions;
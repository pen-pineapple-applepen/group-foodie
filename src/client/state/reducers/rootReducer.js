import { combineReducers } from "redux"
import { namesReducer } from './namesReducer';
import { loginReducer } from './loginReducer';
import { menuItemReducer } from './menuItemReducer';
import { orderItemReducer } from './orderItemReducer';
import { allOrderItemsReducer } from './allOrderItemsReducer';
import { restaurantReducer } from './restaurantReducer';
import { friendReducer } from './friendReducer';
import { groupReducer } from './groupReducer';

const rootReducer = combineReducers({
  names: namesReducer,
  loginDetails: loginReducer,
  currentItemQuantityPrice: menuItemReducer,
  currentMenuItem: orderItemReducer,
  allOrderItems: allOrderItemsReducer,
  currentRestaurant: restaurantReducer,
  friendName: friendReducer,
  currentGroup: groupReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>
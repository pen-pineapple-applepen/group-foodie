import { combineReducers } from "redux"
import { namesReducer } from './namesReducer';
import { currentUserReducer } from './currentUserReducer';
import { loginReducer } from './loginReducer';
import { menuItemReducer } from './menuItemReducer';
import { orderItemReducer } from './orderItemReducer';
import { allOrderItemsReducer } from './allOrderItemsReducer';
import { restaurantReducer } from './restaurantReducer';
import { friendReducer } from './friendReducer';
import { groupReducer } from './groupReducer';
import { paymentsReducer } from './paymentsReducer';

const appReducer = combineReducers({
  names: namesReducer,
  loginDetails: loginReducer,
  currentUser: currentUserReducer,
  currentItemQuantityPrice: menuItemReducer,
  currentMenuItem: orderItemReducer,
  allOrderItems: allOrderItemsReducer,
  currentRestaurant: restaurantReducer,
  friendName: friendReducer,
  currentGroup: groupReducer,
  currentPayments: paymentsReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'LOG_OUT') {
    return appReducer(undefined,action);
  }
  return appReducer(state,action);
}

export default appReducer;
export type RootState = ReturnType<typeof appReducer>
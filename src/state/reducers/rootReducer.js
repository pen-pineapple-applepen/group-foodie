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
import { emailFriendsRecucer } from './emailFriendsReducer';

const rootReducer = combineReducers({
  names: namesReducer,
  loginDetails: loginReducer,
  currentUser: currentUserReducer,
  currentItemQuantityPrice: menuItemReducer,
  currentMenuItem: orderItemReducer,
  allOrderItems: allOrderItemsReducer,
  currentRestaurant: restaurantReducer,
  friendName: friendReducer,
  currentGroup: groupReducer,
  currentPayments: paymentsReducer,
  currentEmails: emailFriendsRecucer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>
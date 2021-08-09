import { combineReducers } from "redux"
import { namesReducer } from './namesReducer';
import { currentUserReducer } from './currentUserReducer';
import { menuItemReducer } from './menuItemReducer';
import { orderItemsReducer } from './orderItemsReducer';
import { restaurantReducer } from './restaurantReducer';
import { friendReducer } from './friendReducer';
import { groupReducer } from './groupReducer';
import { paymentsReducer } from './paymentsReducer';
import { emailFriendsRecucer } from './emailFriendsReducer';

const rootReducer = combineReducers({
  names: namesReducer,
  currentUser: currentUserReducer,
  menuItem: menuItemReducer,
  orderItems: orderItemsReducer,
  currentRestaurant: restaurantReducer,
  friendName: friendReducer,
  currentGroup: groupReducer,
  currentPayments: paymentsReducer,
  currentEmails: emailFriendsRecucer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>
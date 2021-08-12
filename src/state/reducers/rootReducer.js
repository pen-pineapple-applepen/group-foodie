import { combineReducers } from "redux"
import { namesReducer } from './namesReducer';
import { currentUserReducer } from './currentUserReducer';
import { itemReducer } from './itemReducer';
import { ordersReducer } from './ordersReducer';
import { restaurantReducer } from './restaurantReducer';
import { friendReducer } from './friendReducer';
import { groupReducer } from './groupReducer';
import { paymentsReducer } from './paymentsReducer';
import { emailFriendsRecucer } from './emailFriendsReducer';

const rootReducer = combineReducers({
  names: namesReducer,
  currentUser: currentUserReducer,
  item: itemReducer,
  orders: ordersReducer,
  currentRestaurant: restaurantReducer,
  friendName: friendReducer,
  currentGroup: groupReducer,
  currentPayments: paymentsReducer,
  currentEmails: emailFriendsRecucer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>
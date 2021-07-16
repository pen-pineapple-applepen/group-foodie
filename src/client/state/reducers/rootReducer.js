import { combineReducers } from "redux"
import { namesReducer } from './namesReducer';
import { currentUserReducer } from './currentUserReducer';
import { loginReducer } from './loginReducer';
import { menuItemReducer } from './menuItemReducer';
import { orderItemReducer } from './orderItemReducer';
import { allOrderItemsReducer } from './allOrderItemsReducer';
import { friendReducer } from './friendReducer';
import { groupReducer } from './groupReducer';

const rootReducer = combineReducers({
  names: namesReducer,
  loginDetails: loginReducer,
  currentUser: currentUserReducer,
  currentItemQuantityPrice: menuItemReducer,
  currentMenuItem: orderItemReducer,
  allOrderItems: allOrderItemsReducer,
  friendName: friendReducer,
  currentGroup: groupReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>
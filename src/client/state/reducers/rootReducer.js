import { combineReducers } from "redux"
import { namesReducer } from './namesReducer';
import { menuItemReducer } from './menuItemReducer';
import { orderItemReducer } from './orderItemReducer';
import { allOrderItemsReducer } from './allOrderItemsReducer';

const rootReducer = combineReducers({
  names: namesReducer,
  currentItemQuantityPrice: menuItemReducer,
  currentMenuItem: orderItemReducer,
  allOrderItems: allOrderItemsReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>
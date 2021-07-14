import { combineReducers } from "redux"
import { namesReducer } from './namesReducer';
import { currentUserReducer } from './currentUserReducer';

const rootReducer = combineReducers({
  names: namesReducer,
  currentUser: currentUserReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>
import { combineReducers } from "redux"
import { namesReducer } from './namesReducer';
import { currentUserReducer } from './currentUserReducer';
import { loginReducer } from './loginReducer';

const rootReducer = combineReducers({
  names: namesReducer,
  loginDetails: loginReducer,
  currentUser: currentUserReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>
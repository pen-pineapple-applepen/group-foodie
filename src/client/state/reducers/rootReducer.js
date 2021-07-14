import { combineReducers } from "redux"
import { namesReducer } from './namesReducer';
import { loginReducer } from './loginReducer';

const rootReducer = combineReducers({
  names: namesReducer,
  loginDetails: loginReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>
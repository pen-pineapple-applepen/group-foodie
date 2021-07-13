import { combineReducers } from "redux"
import { namesReducer } from './namesReducer';

const rootReducer = combineReducers({
  names: namesReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>
import { combineReducers } from "redux"
import { namesReducer } from './namesReducer';
import { loginReducer } from './loginReducer';
import { dateReducer } from './dateReducer';
import { emailsReducer } from './emailsReducer';

const rootReducer = combineReducers({
  names: namesReducer,
  loginDetails: loginReducer,
  orderDate: dateReducer,
  emails: emailsReducer
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>
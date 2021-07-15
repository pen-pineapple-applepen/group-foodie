import { addName, addUserName, setNumber } from '../reducers/namesReducer';
import { addDate } from '../reducers/dateReducer';
import { addEmail, removeEmail } from '../reducers/emailsReducer';


const allActions = {
  addName, addDate, addEmail, removeEmail
}

export default allActions;
import { combineReducers } from 'redux';
import Withdraw from './Withdraw';
import Deposit from './Deposit';

const rootReducer = combineReducers({
  Withdraw,
  Deposit
})

export default rootReducer;

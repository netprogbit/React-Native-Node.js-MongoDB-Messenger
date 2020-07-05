import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import userReducer from './user.reducer';
import messageReducer from './message.reducer';
import errorReducer  from './error.reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  message: messageReducer,
  error: errorReducer,
});

export default rootReducer;
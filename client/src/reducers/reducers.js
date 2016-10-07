import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import authReducer from './loggedin';
import keysReducer from './keys';


const rootReducer = combineReducers({
  auth: authReducer,
  form: FormReducer,
  keys: keysReducer
});

export default rootReducer;

import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import authReducer from './loggedin';
import keyModalReducer from './keymodal';
import keysReducer from './keys';


const rootReducer = combineReducers({
  auth: authReducer,
  form: FormReducer,
  keymodal: keyModalReducer,
  keys: keysReducer
});

export default rootReducer;

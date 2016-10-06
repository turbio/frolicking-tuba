import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import authReducer from './loggedin';
import apiKeysReducer from './keys';
import keyModalReducer from './keymodal';


const rootReducer = combineReducers({
  auth: authReducer,
  form: FormReducer,
  apiKeys: apiKeysReducer,
  keymodal: keyModalReducer
});

export default rootReducer;

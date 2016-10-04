import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import authReducer from './loggedin';
import apiKeysReducer from './keys';


const rootReducer = combineReducers({
  auth: authReducer,
  form: FormReducer,
  apiKeys: apiKeysReducer
});

export default rootReducer;

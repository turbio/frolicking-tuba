import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import authReducer from './loggedin';


const rootReducer = combineReducers({
  auth: authReducer,
  form: FormReducer
});

export default rootReducer;

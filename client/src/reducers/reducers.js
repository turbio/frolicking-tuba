import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import authReducer from './loggedin';
import keyModalReducer from './keymodal';
import editModalReducer from './editmodal';
import keysReducer from './keys';
import urlsReducer from './urls';
import reposReducer from './repos';


const rootReducer = combineReducers({
  auth: authReducer,
  form: FormReducer,
  keymodal: keyModalReducer,
  editmodal: editModalReducer,
  keys: keysReducer,
  urls: urlsReducer,
  repos: reposReducer
});

export default rootReducer;

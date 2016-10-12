import { AUTH_USER, SIGN_OUT_USER,
  AUTH_ERROR, UPDATE_GITHUB_STATUS } from '../utils/AppConstants';

// The initial application state
const initialState = {
  authenticated: false,
  email: '',
  github: false,
  error: null
};
const assign = Object.assign;


export default function authReducer(state = initialState, action) {
  switch (action.type) {
  case AUTH_USER:
    return assign({}, state, {
      authenticated: true,
      email: action.email,
      error: null
    });
  case SIGN_OUT_USER:
    return assign({}, state, initialState);
  case AUTH_ERROR:
    return assign({}, state, { authenticated: false, error: action.payload });
  case UPDATE_GITHUB_STATUS:
    return assign({}, state, { github: action.status });
  default:
    return state;
  }
}

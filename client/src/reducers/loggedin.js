import { AUTH_USER, SIGN_OUT_USER, AUTH_ERROR } from '../utils/AppConstants';

// The initial application state
const initialState = { authenticated: false };
const assign = Object.assign;


export default function authReducer(state = initialState, action) {
  switch (action.type) {
  case AUTH_USER:
    return assign({}, state, { authenticated: true });
  case SIGN_OUT_USER:
    return assign({}, state, { authenticated: false });
  case AUTH_ERROR:
    return assign({}, state, { authenticated: false, error: action.payload });
  default:
    return state;
  }
}

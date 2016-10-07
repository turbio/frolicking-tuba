import { AUTH_USER, SIGN_OUT_USER, AUTH_ERROR } from '../utils/AppConstants';

// The initial application state
const initialState = { authenticated: false };

export default function authReducer(state = initialState, action) {
  switch (action.type) {
  case AUTH_USER:
    return { authenticated: true };
  case SIGN_OUT_USER:
    return { authenticated: false };
  case AUTH_ERROR:
    return { authenticated: false, error: action.payload };
  default:
    return state;
  }
}

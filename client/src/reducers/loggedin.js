//import assign from 'object.assign';
//import { auth } from '../utils/auth';
import { AUTH_USER, SIGN_OUT_USER, AUTH_ERROR } from '../utils/AppConstants';
//const assign = Object.assign || require('object.assign');

// The initial application state
const initialState = {
  authenticated: false,
  error: null
};


export default function authReducer(state = initialState, action) {
  switch (action.type) {
  case AUTH_USER:
    return {
      state,
      authenticated: true,
      error: null
    };
  case SIGN_OUT_USER:
    return {
      state,
      authenticated: false,
      error: null
    };
  case AUTH_ERROR:
    return {
      state,
      error: action.payload
    };
  default:
    return state;
  }
}


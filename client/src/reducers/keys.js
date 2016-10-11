import { FETCH_KEYS, SIGN_OUT_USER } from '../utils/AppConstants';


const initialState = { data: [] };
const assign = Object.assign;


export default function keysReducer(state = initialState, action) {

  switch (action.type) {
  case FETCH_KEYS:
    return assign({}, state, { data: action.payload });
  case SIGN_OUT_USER:
    return assign({}, state, initialState);
  default:
    return state;
  }
}

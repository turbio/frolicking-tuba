import { FETCH_KEYS } from '../utils/AppConstants';


const initialState = { data: [] };
const assign = Object.assign;

export default function keysReducer(state = initialState, action) {
  switch (action.type) {
  case FETCH_KEYS:
    return assign({}, state, { data: action.payload });
  default:
    return state;
  }
}

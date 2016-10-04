import { FETCH_KEYS } from '../utils/AppConstants';

const assign = Object.assign;

const initialState = { keys: [] };

export default function apiKeysReducer(state = initialState, action) {
  switch (action.type) {
  case FETCH_KEYS:
    return assign({}, state, { keys: action.payload });
  default:
    return state;
  }
}


// return assign({}, state, {
//   formState: action.newState
// });

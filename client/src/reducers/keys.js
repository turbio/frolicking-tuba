import { FETCH_KEYS } from '../utils/AppConstants';

const initialState = [];

export default function keysReducer(state = initialState, action) {
  switch (action.type) {
  case FETCH_KEYS:
    return ['first', 'second', 'third'];
  default:
    return state;
  }
}

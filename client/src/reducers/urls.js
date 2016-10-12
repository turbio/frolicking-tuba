import { FETCH_URLS, ADD_NEW_URL } from '../utils/AppConstants';


const initialState = { urls: [] };
const assign = Object.assign;


export default function urlsReducer(state = initialState, action) {

  switch (action.type) {
  case FETCH_URLS:
    return assign({}, state, { urls: action.urls });
  case ADD_NEW_URL:
    return assign({}, state, initialState);
  default:
    return state;
  }
}

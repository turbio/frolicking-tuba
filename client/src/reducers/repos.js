import { FETCH_REPOS } from '../utils/AppConstants';


const initialState = { repos: [] };
const assign = Object.assign;


export default function reposReducer(state = initialState, action) {

  switch (action.type) {
  case FETCH_REPOS:
    return assign({}, state, { repos: action.repos });
  default:
    return state;
  }
}

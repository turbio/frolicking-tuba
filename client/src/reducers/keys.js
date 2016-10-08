import { FETCH_KEYS } from '../utils/AppConstants';


const initialState = {
  data: []
  // data: [
  //   {
  //     name: 'test1',
  //     api_key: 'test1',
  //     endpoint: 'test1'
  //   },
  //   {
  //     name: 'test2',
  //     api_key: 'test2',
  //     endpoint: 'test2'
  //   }
  // ]
};
const assign = Object.assign;


export default function keysReducer(state = initialState, action) {
  console.log(action, 'keyReducer');

  switch (action.type) {
  case FETCH_KEYS:
    return assign({}, state, { data: action.payload });
  default:
    return state;
  }
}

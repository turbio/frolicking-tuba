import { OPEN_MODAL, CLOSE_MODAL } from '../utils/AppConstants';

const assign = Object.assign;

const initialState = { showModal: false };

export default function keyModalReducer(state = initialState, action) {
  console.log(action, 'thisaction');
  switch (action.type) {
  case OPEN_MODAL:
    return assign({}, state, { showModal: true });
  case CLOSE_MODAL:
    return assign({}, state, { showModal: false });
  default:
    return state;
  }
}

// neither github nor url - show select from 2 on add
// has url but no github - show dropdown + select from 2 on add
// has no url but has github - show dropdown + select from 1
//has github and url - show dropdown + select from 1

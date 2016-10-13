import { OPEN_EDIT_MODAL,
  CLOSE_EDIT_MODAL, SET_EDIT_MODAL_MODE } from '../utils/AppConstants';

const assign = Object.assign;

const initialState = {
  show: false,
  key: null,
  modalModeAddUrl: false
};

export default function editModalReducer(state = initialState, action) {
  switch (action.type) {
  case OPEN_EDIT_MODAL:
    return assign({}, state, { show: true, key: action.key });
  case CLOSE_EDIT_MODAL:
    return assign({}, state, {
      show: false,
      key: null,
      modalModeAddUrl: false
    });
  case SET_EDIT_MODAL_MODE:
    return assign({}, state, { modalModeAddUrl: action.mode });
  default:
    return state;
  }
}

import { OPEN_MODAL,
  CLOSE_MODAL, SET_MODAL_MODE } from '../utils/AppConstants';

const assign = Object.assign;

const initialState = {
  showModal: false,
  modalModeAddUrl: false
};

export default function keyModalReducer(state = initialState, action) {
  switch (action.type) {
  case OPEN_MODAL:
    return assign({}, state, { showModal: true });
  case CLOSE_MODAL:
    return assign({}, state, {
      showModal: false,
      modalModeAddUrl: false
    });
  case SET_MODAL_MODE:
    return assign({}, state, { modalModeAddUrl: action.modalModeAddUrl });
  default:
    return state;
  }
}

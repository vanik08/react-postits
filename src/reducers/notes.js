import * as actionTypes from '../constants/actionTypes';

const initialState = {
  stack: [],
};

function notes(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_TO_STACK:
      return {
        ...state,
        stack: [...state.stack, action.payload],
      };
    default:
      return state;
  }
}

export default notes;

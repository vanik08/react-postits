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
    case actionTypes.CHANGE_POSITION:
      const idx = state.stack.findIndex(itm => itm.id === action.payload.id);
      const newStack = [...state.stack];

      newStack[idx].x = action.payload.x - 100;
      newStack[idx].y = action.payload.y - 100;

      return {
        ...state,
        stack: newStack,
      };
    default:
      return state;
  }
}

export default notes;

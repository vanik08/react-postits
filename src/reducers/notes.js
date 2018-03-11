import * as actionTypes from '../constants/actionTypes';

const initialState = {
  openPostitId: null,
  stack: [],
};

let currZ = 0;

function getNewCoords(state, action) {
  currZ += 1;
  const idx = state.stack.findIndex(itm => itm.id === action.payload.id);
  const newStack = [...state.stack];

  newStack[idx].x = action.payload.x - 100;
  newStack[idx].y = action.payload.y - 100;
  newStack[idx].zIndex = currZ;

  return newStack;
}

function notes(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_TO_STACK:
      currZ += 1;

      return {
        ...state,
        stack: [
          ...state.stack,
          {
            zIndex: currZ,
            ...action.payload,
          },
        ],
      };
    case actionTypes.CHANGE_POSITION:
      return {
        ...state,
        stack: getNewCoords(state, action),
      };
    case actionTypes.OPEN_POSTIT:
      return {
        ...state,
        openPostitId: action.payload.id,
        stack: getNewCoords(state, action),
      };

    default:
      return state;
  }
}

export default notes;

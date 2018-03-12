import * as actionTypes from '../constants/actionTypes';

const initialState = {
  closePostit: null,
  openPostitId: null,
  stack: [],
  oldCoords: {},
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
        openPostitId: null,
        closePostit: null,
        stack: getNewCoords(state, action),
      };
    case actionTypes.OPEN_POSTIT:
      return {
        ...state,
        closePostit:
          state.openPostitId === action.payload.id ? action.payload.id : null,
        openPostitId:
          state.openPostitId !== action.payload.id ? action.payload.id : null,
        stack: getNewCoords(state, action),
      };

    default:
      return state;
  }
}

export default notes;

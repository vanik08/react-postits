import * as actionTypes from '../constants/actionTypes';
import pick from 'lodash/pick';

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

function getNewCoordsFromClose(state, action) {
  const idx = state.stack.findIndex(itm => itm.id === action.payload.id);
  const oldCoords = state.oldCoords[action.payload.id];
  const newStack = [...state.stack];

  newStack[idx].x = oldCoords.x;
  newStack[idx].y = oldCoords.y;

  return newStack;
}

function getCloseCoords(state, action) {
  const idx = state.stack.findIndex(itm => itm.id === state.closePostit);
  const newStack = [...state.stack];

  newStack[idx].x = state.oldCoords[state.closePostit].x;
  newStack[idx].y = state.oldCoords[state.closePostit].y;

  return newStack;
}

function getOldCoords(state, action) {
  const idx = state.stack.findIndex(itm => itm.id === action.payload.id);
  const newStack = [...state.stack];
  const oldCoords = pick(newStack[idx], 'x', 'y');

  return oldCoords;
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
    case actionTypes.CLOSE_POSTIT:
      return {
        ...state,
        closePostit: action.payload.id,
        openPostitId: null,
        stack: getNewCoordsFromClose(state, action),
      };
    case actionTypes.OPEN_POSTIT:
      return {
        ...state,
        openPostitId: action.payload.id,
        oldCoords: {
          ...state.oldCoords,
          [action.payload.id]: getOldCoords(state, action),
        },
        stack: getNewCoords(state, action),
      };
    default:
      return state;
  }
}

export default notes;

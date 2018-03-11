import * as actionTypes from '../constants/actionTypes';
import { uniqueId } from 'lodash';

export function addToStack() {
  return {
    type: actionTypes.ADD_TO_STACK,
    payload: {
      id: uniqueId(),
      x: 10,
      y: 75,
    },
  };
}

export function changePosition(payload) {
  return {
    type: actionTypes.CHANGE_POSITION,
    payload,
  };
}

export function openPostit(id) {
  return {
    type: actionTypes.OPEN_POSTIT,
    payload: {
      id,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    },
  };
}

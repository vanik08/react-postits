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

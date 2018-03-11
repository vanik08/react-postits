import * as actionTypes from '../constants/actionTypes';
import { uniqueId } from 'lodash';

export function addToStack(payload) {
  return {
    type: actionTypes.ADD_TO_STACK,
    payload: {
      id: uniqueId(),
    },
  };
}

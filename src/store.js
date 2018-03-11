import { createStore, combineReducers } from 'redux';
import notes from './reducers/notes';

export default createStore(combineReducers({ notes }));

import { createStore } from 'redux';
import user from './reducers/User';
import {loadState} from './localStorage';

const persistedState = loadState();
const store = createStore(user,persistedState);

export default store;
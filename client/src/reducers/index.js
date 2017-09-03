// index.js for reducers
// this file contains all reducers (by importing all of them and combining them into one, to form what the store will use)

import {combineReducers} from 'redux';
import CreateReducer from './CreateReducer';
// import JoinReducer from './JoinReducer';
import PlayReducer from './PlayReducer';
import ClientReducer from './ClientReducer';

/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

const allReducers = combineReducers({
    client: ClientReducer,
    create: CreateReducer,
    // join: JoinReducer,
    play: PlayReducer
});

export default allReducers

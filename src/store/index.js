import { combineReducers } from 'redux';

import { editorReducer } from './reducers/reducers.js';
import { otherReducer } from './reducers/reducers2.js';

export const rootReducer = combineReducers({
    editor: editorReducer,
    other: otherReducer
})

import { combineReducers } from 'redux';

import { editorReducer } from './reducers/reducers.js';

export const rootReducer = combineReducers({
    editor: editorReducer
})

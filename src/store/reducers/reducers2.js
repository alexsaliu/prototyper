import {
    SAVE_PROJECT
} from '../constants.js';

const initialState = JSON.parse(localStorage.getItem('projects')) || {
    projects: [],
    currentProjectId: 0
}

const storeInLocalStorage = (state) => {
    localStorage.setItem('projects', JSON.stringify(state))
    return state
}

const pipe = (...functions) => args => functions.reduce((arg, fn) => fn(arg), args)

export const otherReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case SAVE_PROJECT:
            return pipe(storeInLocalStorage)({...state, projects: action.payload})
        default:
            return state
    }
}

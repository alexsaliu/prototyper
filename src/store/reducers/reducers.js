import {
    UPDATE_ELEMENTS,
    SET_SELECTED_ELEMENT_ID,
    SET_HOVERED_ELEMENT_ID,
    SET_CANVAS_SIZE,
    TOGGLE_COLOR_PANEL,
    UPDATE_RECENT_COLORS,
    UPDATE_HISTORY,
    STEP_HISTORY
} from '../constants.js';

import History from '../history.js'

const initialState = JSON.parse(localStorage.getItem('state')) || {
    canvasSize: [960, 540],
    elements: [],
    selectedElementId: '',
    hoveredElementId: '',
    colorPanel: false,
    recentColors: []
}

const history = new History()
history.add(JSON.parse(JSON.stringify(initialState)))

// const updateHistory = (state) => {
    // go back
        // pop off history and push to temp
        // update state with end of history
    // go forwards
        // if temp.length
        // pop off temp push to history
        // update state with end of history
    // if
// }

const storeStateInLocalStorage = (state) => {
    localStorage.setItem('state', JSON.stringify(state))
    return state
}

// const addToHistory = (state) => {
//     history.push(state)
//     console.log("History: ", history)
//     return state
// }

const pipe = (...functions) => args => functions.reduce((arg, fn) => fn(arg), args)

export const editorReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case UPDATE_ELEMENTS:
            return {...state, elements: action.payload}
        case SET_SELECTED_ELEMENT_ID:
            return {...state, selectedElementId: action.payload}
        case SET_HOVERED_ELEMENT_ID:
            return {...state, hoveredElementId: action.payload}
        case SET_CANVAS_SIZE:
            return pipe(storeStateInLocalStorage, history.add)({...state, canvasSize: action.payload})
        case TOGGLE_COLOR_PANEL:
            return {...state, colorPanel: action.payload}
        case UPDATE_RECENT_COLORS:
            return pipe(storeStateInLocalStorage, history.add)({...state, recentColors: action.payload})
        case UPDATE_HISTORY:
            return history.add(state)
        case STEP_HISTORY:
            return action.payload > 0 ? history.stepForward() : history.stepBack()
        default:
            return state
    }
}

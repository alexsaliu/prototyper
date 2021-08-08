import {
    UPDATE_ELEMENTS,
    SET_SELECTED_ELEMENT_ID,
    SET_HOVERED_ELEMENT_ID,
    SET_CANVAS_SIZE,
    TOGGLE_COLOR_PANEL,
    SET_DISABLE_STYLES_INPUT,
    UPDATE_RECENT_COLORS,
    UPDATE_HISTORY,
    STEP_HISTORY,
    SELECT_PROJECT
} from '../constants.js';

import History from '../history.js'

const initialState = JSON.parse(localStorage.getItem('state')) || {
    mode: 'edit',
    canvasSize: [960, 540],
    elements: [],
    selectedElementId: '',
    hoveredElementId: '',
    colorPanel: false,
    disableStylesInput: false,
    recentColors: []
}

const history = new History()
history.add(JSON.parse(JSON.stringify(initialState)))

const storeInLocalStorage = (state) => {
    localStorage.setItem('state', JSON.stringify(state))
    return state
}

const addToHistory = (state) => {
    return history.add(state)
}

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
            return pipe(storeInLocalStorage, addToHistory)({...state, canvasSize: action.payload})
        case TOGGLE_COLOR_PANEL:
            return {...state, colorPanel: action.payload}
        case SET_DISABLE_STYLES_INPUT:
            return {...state, disableStylesInput: action.payload}
        case UPDATE_RECENT_COLORS:
            return pipe(storeInLocalStorage, addToHistory)({...state, recentColors: action.payload})
        case UPDATE_HISTORY:
            return pipe(storeInLocalStorage, addToHistory)(state)
        case STEP_HISTORY:
            return action.payload > 0 ? history.stepForward() : history.stepBack()
        case SELECT_PROJECT:
            return pipe(storeInLocalStorage)(action.payload)
        default:
            return state
    }
}

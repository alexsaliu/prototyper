import {
    SET_MOUSE_POSITION,
    UPDATE_ELEMENTS,
    SET_SELECTED_ELEMENT_ID,
    SET_HOVERED_ELEMENT_ID,
    SET_CANVAS_SIZE,
    TOGGLE_COLOR_PANEL
} from '../constants.js';

const initialState = {
    canvasSize: [800, 235],
    mousePosition: [0,0],
    elements: JSON.parse(localStorage.getItem('elements')) || [],
    selectedElementId: -1,
    hoveredElementId: -1,
    colorPanel: false
}

export const editorReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_MOUSE_POSITION:
            return {...state, mousePosition: action.payload};
        case UPDATE_ELEMENTS:
            localStorage.setItem('elements', JSON.stringify(action.payload))
            return {...state, elements: action.payload};
        case SET_SELECTED_ELEMENT_ID:
            return {...state, selectedElementId: action.payload};
        case SET_HOVERED_ELEMENT_ID:
            return {...state, hoveredElementId: action.payload};
        case SET_CANVAS_SIZE:
            return {...state, canvasSize: action.payload};
        case TOGGLE_COLOR_PANEL:
            return {...state, colorPanel: action.payload};
        default:
            return state;
    }
}

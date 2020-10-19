import {
    SET_MOUSE_POSITION,
    UPDATE_ELEMENTS,
    SET_SELECTED_ELEMENT_ID,
    SET_CANVAS_SIZE
} from '../constants.js';

const initialState = {
    canvasSize: [800, 235],
    mousePosition: [0,0],
    elements: [],
    selectedElementId: -1,
}

export const editorReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_MOUSE_POSITION:
            return {...state, mousePosition: action.payload};
        case UPDATE_ELEMENTS:
            return {...state, elements: action.payload};
        case SET_SELECTED_ELEMENT_ID:
            return {...state, selectedElementId: action.payload};
        case SET_CANVAS_SIZE:
            return {...state, canvasSize: action.payload};
        default:
            return state;
    }
}

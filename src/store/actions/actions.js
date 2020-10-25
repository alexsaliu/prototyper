import {
    SET_MOUSE_POSITION,
    UPDATE_ELEMENTS,
    SET_SELECTED_ELEMENT_ID,
    SET_CANVAS_SIZE,
    TOGGLE_COLOR_PANEL
} from '../constants.js';

export const setMousePosition = (coords) => {
    return {
        type: SET_MOUSE_POSITION,
        payload: coords,
    }
}

export const updateElements = (elements) => {
    return {
        type: UPDATE_ELEMENTS,
        payload: elements,
    }
}

export const setSelectedElementId = (id) => {
    return {
        type: SET_SELECTED_ELEMENT_ID,
        payload: id,
    }
}

export const setCanvasSize = (bool) => {
    return {
        type: SET_CANVAS_SIZE,
        payload: bool,
    }
}

export const toggleColorPanel = (bool) => {
    return {
        type: TOGGLE_COLOR_PANEL,
        payload: bool,
    }
}

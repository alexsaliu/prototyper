import {
    UPDATE_ELEMENTS,
    SET_SELECTED_ELEMENT_ID,
    SET_HOVERED_ELEMENT_ID,
    SET_CANVAS_SIZE,
    TOGGLE_COLOR_PANEL,
    UPDATE_RECENT_COLORS
} from '../constants.js';

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
export const setHoveredElementId = (id) => {
    return {
        type: SET_HOVERED_ELEMENT_ID,
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
export const updateRecentColors = (color) => {
    return {
        type: UPDATE_RECENT_COLORS,
        payload: color,
    }
}

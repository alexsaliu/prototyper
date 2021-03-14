import {
    SAVE_PROJECT
} from '../constants.js';

export const saveProject = (data) => {
    return {
        type: SAVE_PROJECT,
        payload: data,
    }
}

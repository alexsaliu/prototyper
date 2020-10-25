import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './canvasHeader.css';

import {
    toggleColorPanel
} from '../../store/actions/actions.js';

const CanvasHeader = () => {
    const selectedId = useSelector(state => state.editor.selectedElementId);
    const colorPanel = useSelector(state => state.editor.colorPanel);
    const dispatch = useDispatch();



    return (
        <div className="canvas-header">
            <div onClick={() => dispatch(toggleColorPanel(!colorPanel))} style={colorPanel ? {'boxShadow': '0px 0px 0px 4px #394c6026'} : {}} className="color-toggle-container">
                <div className="color-toggle"></div>
            </div>
        </div>
    );
}

export default CanvasHeader;

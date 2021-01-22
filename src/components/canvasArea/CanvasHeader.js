import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './canvasHeader.css';

import {
    toggleColorPanel
} from '../../store/actions/actions.js';

const CanvasHeader = () => {
    const selectedId = useSelector(state => state.editor.selectedElementId);
    const elements = useSelector(state => state.editor.elements);
    const colorPanel = useSelector(state => state.editor.colorPanel);
    const dispatch = useDispatch();

    return (
        <div className="canvas-header">
            { selectedId ?
                <div onClick={() => dispatch(toggleColorPanel(!colorPanel))} style={colorPanel ? {'boxShadow': '0px 0px 0px 4px #394c6026'} : {}} className="color-toggle-container">
                    <div style={{background: elements[parseInt(selectedId)].styles.background}} className="color-toggle"></div>
                </div> : ''
            }
        </div>
    );
}

export default CanvasHeader;

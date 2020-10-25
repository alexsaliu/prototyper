import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './colorPanel.css';
import rainbow from './rainbow.png';

import {
    updateElements,
} from '../../store/actions/actions.js';

const ColorPanel = () => {
    const colorPanel = useSelector(state => state.editor.colorPanel);
    const dispatch = useDispatch();

    return (
        <div className="color-panel">
            <div className="color">
                <div className="rainbow"></div>
            </div>
            <div className="color" style={{background: 'lightblue'}}>
            </div>
        </div>
    );
}

export default ColorPanel;

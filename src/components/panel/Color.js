import React, { useState, useRef } from 'react';
import { useSelector, useDispatch} from 'react-redux';

import Tooltip from '../misc/tooltip/Tooltip.js';

import './colorPanel.css';

import {
    updateElements,
} from '../../store/actions/actions.js';

const Color = ({color, offsetTooltip}) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const selectedId = useSelector(state => state.editor.selectedElementId);
    const elements = useSelector(state => state.editor.elements);

    const dispatch = useDispatch();

    const timeout = useRef(null)

    const tooltipTrigger = (show) => {
        if (show) {
            timeout.current = setTimeout(() => {setShowTooltip(true)}, 500)
        }
        else {
            clearTimeout(timeout.current);
            setShowTooltip(false);
        }
    }

    const setElementColor = () => {
        const elementsCopy = [...elements];
        const styles = {...elementsCopy[selectedId].styles};
        styles.background = color;
        elementsCopy[selectedId].styles = styles;
        dispatch(updateElements(elementsCopy))
    }

    return (
        <div
            onClick={() => setElementColor()}
            onMouseOver={() => tooltipTrigger(true)}
            onMouseLeave={() => tooltipTrigger(false)}
            className="color"
            style={{background: color}}
        >
            <div className="tooltip-container">
                <Tooltip show={showTooltip} content={color} offset={offsetTooltip} direction="bottom" />
            </div>
        </div>
    );
}

export default Color;

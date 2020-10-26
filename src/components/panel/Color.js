import React, { useState, useRef } from 'react';

import Tooltip from '../misc/tooltip/Tooltip.js';

import './colorPanel.css';

const Color = ({color, offsetTooltip}) => {
    const [showTooltip, setShowTooltip] = useState(false);

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

    return (
        <div onMouseOver={() => tooltipTrigger(true)} onMouseLeave={() => tooltipTrigger(false)} className="color" style={{background: color}}>
            <div className="tooltip-container">
                <Tooltip show={showTooltip} content={color} offset={offsetTooltip} direction="bottom" />
            </div>
        </div>
    );
}

export default Color;

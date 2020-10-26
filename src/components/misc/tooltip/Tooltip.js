import React, {useState, useEffect} from 'react';
import './tooltip.css';


const Tooltip = ({show, content, offset, direction}) => {

    return (
        <div style={show ? {opacity: 1, visibility: 'visible'} : {}} className="tooltip">
            <div style={{transform: `translateX(${offset}px)`}} className="tooltip-content">{content}</div>
            <div style={direction === "top" ? {top: '18px', transform: `rotate(180deg)`} : {top: '-4px'}} className="tooltip-arrow"></div>
        </div>
    );
}

export default Tooltip;

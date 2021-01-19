import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Adjuster from './adjuster/Adjuster.js';

import './element.css';

import {
    setSelectedElementId,
} from '../../store/actions/actions.js';

const Element = ({id}) => {
    const [hovered, setHovered] = useState(false)
    const elements = useSelector(state => state.editor.elements);
    const selectedId = useSelector(state => state.editor.selectedElementId);
    const hoveredId = useSelector(state => state.editor.hoveredElementId);
    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.stopPropagation()
        dispatch(setSelectedElementId(id))
    }

    return (
        <div
            className="element"
            style={elements[id].styles}
            onClick={(e) => handleClick(e)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {hoveredId === id || hovered ? <div className="hover-border"></div> : ''}
            {selectedId === id ? <Adjuster /> : ''}
        </div>
    );
}

export default Element;

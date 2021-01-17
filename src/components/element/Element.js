import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Adjuster from './adjuster/Adjuster.js';

import './element.css';

import {
    setSelectedElementId,
} from '../../store/actions/actions.js';

const Element = ({id}) => {
    const elements = useSelector(state => state.editor.elements);
    const selectedId = useSelector(state => state.editor.selectedElementId);
    const hoveredId = useSelector(state => state.editor.hoveredElementId);
    const dispatch = useDispatch();

    return (
        <div
            className="element"
            style={elements[id].styles}
            onClick={() => dispatch(setSelectedElementId(id))}
        >
            {hoveredId === id ? <div className="hover-border"></div> : ''}
            {selectedId === id ? <Adjuster /> : ''}
        </div>
    );
}

export default Element;

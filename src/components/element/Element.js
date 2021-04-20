import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getElement } from '../../helpers.js'
import Adjuster from './adjuster/Adjuster.js'

import './element.css'

import {
    setSelectedElementId,
    setHoveredElementId,
    updateElements
} from '../../store/actions/actions.js'

const Element = ({id, children, preventParentHovering}) => {
    const [hovered, setHovered] = useState(false)
    const [childHovered, setChildHovered] = useState(false)

    const elements = useSelector(state => state.editor.elements)
    const selectedId = useSelector(state => state.editor.selectedElementId)
    const hoveredId = useSelector(state => state.editor.hoveredElementId)
    const dispatch = useDispatch()

    const elementRef = useRef(null)

    const handleClick = (e) => {
        e.stopPropagation()
        dispatch(setSelectedElementId(id))
    }

    const handelHover = (e, hovering) => {
        setHovered(hovering)
        if (typeof preventParentHovering !== "undefined") {
            preventParentHovering(hovering)
        }
        dispatch(setHoveredElementId(hovering ? id : ''))
    }

    const childHovering = (hovering) => {
        setChildHovered(hovering)
    }

    return (
        <div
            ref={elementRef}
            className="element"
            style={getElement(id, elements).styles}
            onClick={(e) => handleClick(e)}
            onMouseEnter={(e) => handelHover(e, true)}
            onMouseLeave={(e) => handelHover(e, false)}
        >
            {hoveredId === id || (hovered && !childHovered) ? <div className="hover-border"></div> : ''}
            {selectedId === id ? <Adjuster elementRef={elementRef} /> : ''}
            {children.map((element, i) => <Element key={i} id={id + '-' + i} children={element.children} preventParentHovering={childHovering} />)}
        </div>
    );
}

export default Element

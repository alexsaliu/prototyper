import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getElement } from '../../helpers.js'
import Adjuster from './adjuster/Adjuster.js'

import './element.css'

import {
    setSelectedElementId,
    setHoveredElementId
} from '../../store/actions/actions.js'

const Element = ({id, children, preventParentHovering}) => {
    const [hovered, setHovered] = useState(false)
    const [childHovered, setChildHovered] = useState(false)
    const [styles, setStyles] = useState({})

    const elements = useSelector(state => state.editor.elements)
    const selectedId = useSelector(state => state.editor.selectedElementId)
    const hoveredId = useSelector(state => state.editor.hoveredElementId)
    const dispatch = useDispatch()

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

    useEffect(() => {
        setStyles(getElement(id, elements).styles)
    }, [elements])

    const childHovering = (hovering) => {
        setChildHovered(hovering)
    }

    return (
        <div
            className="element"
            style={styles}
            onClick={(e) => handleClick(e)}
            onMouseEnter={(e) => handelHover(e, true)}
            onMouseLeave={(e) => handelHover(e, false)}
        >
            {hoveredId === id || (hovered && !childHovered) ? <div className="hover-border"></div> : ''}
            {selectedId === id ? <Adjuster /> : ''}
            {children.map((element, i) => <Element key={i} id={id + '-' + i} children={element.children} preventParentHovering={childHovering} />)}
        </div>
    );
}

export default Element

import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getElement } from '../../helpers.js'
import Adjuster from './adjuster/Adjuster.js'

import './element.css'

import {
    setSelectedElementId,
} from '../../store/actions/actions.js'

const Element = ({id, children}) => {
    const [hovered, setHovered] = useState(false)
    const [styles, setStyles] = useState({})

    const elements = useSelector(state => state.editor.elements)
    const selectedId = useSelector(state => state.editor.selectedElementId)
    const hoveredId = useSelector(state => state.editor.hoveredElementId)
    const dispatch = useDispatch()

    const handleClick = (e) => {
        e.stopPropagation()
        dispatch(setSelectedElementId(id))
    }

    useEffect(() => {
        setStyles(getElement(id, elements).styles)
    }, [elements])

    return (
        <div
            className="element"
            style={styles}
            onClick={(e) => handleClick(e)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {hoveredId === id || hovered ? <div className="hover-border"></div> : ''}
            {selectedId === id ? <Adjuster /> : ''}
            {children.map((element, i) => <Element key={i} id={id + '-' + i} children={element.children} />)}
        </div>
    );
}

export default Element

import React, { useState,  useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './panelElement.css'

import {
    setSelectedElementId,
    setHoveredElementId
} from '../../store/actions/actions.js'

const PanelElement = ({id}) => {
    const [padding, setPadding] = useState(0)

    const selectedId = useSelector(state => state.editor.selectedElementId)
    const dispatch = useDispatch()

    useEffect(() => {
        setPadding(id.split('-').length - 1)
    }, [id])

    return (
        <div
        key={id}
        className="panel-element"
        style={{
            background: selectedId === id ? '#0e1318': '',
            paddingLeft: `${padding}rem`
        }}
        onClick={() => dispatch(setSelectedElementId(id))}
        onMouseEnter={() => dispatch(setHoveredElementId(id))}
        onMouseLeave={() => dispatch(setHoveredElementId(''))}
        >
            <div style={{background: selectedId === id ? 'var(--highlight-color)': ''}} className="panel-element-icon">
            </div>
            <div onChange={() => test()} className="panel-element-name">
                element {id}
            </div>
        </div>
    )
}

export default PanelElement

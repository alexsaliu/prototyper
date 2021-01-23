import React, { useState,  useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './panelElement.css'

import {
    setSelectedElementId,
    setHoveredElementId
} from '../../store/actions/actions.js'

const PanelElement = ({id}) => {
    const [padding, setPadding] = useState(0)
    const [lineHeight, setLineHeight] = useState(1)

    const selectedId = useSelector(state => state.editor.selectedElementId)
    const elements = useSelector(state => state.editor.elements)
    const dispatch = useDispatch()

    useEffect(() => {
        setLineHeight(calculateLineHeight(id, elements))
    }, [elements])

    useEffect(() => {
        setPadding(id.split('-').length - 1)
    }, [id])

    const calculateLineHeight = (id, elements) => {
        let siblingId = id.split('-').map(id => parseInt(id))
        let len = siblingId.length
        if (len === 1 || siblingId[len - 1] === 0) return 1
        // Get previous sibling element
        siblingId[len - 1] = siblingId[len - 1] - 1
        let siblingElement = elements[siblingId[0]]
        for (let i = 1; i < len; i++) {
            siblingElement = siblingElement.children[siblingId[i]]
        }
        // Count all children in sibling element tree
        const traverse = (children, count=0) => {
            for (const child of children) {
                count += traverse(child.children)
            }
            return count + 1
        }
        const height = traverse(siblingElement.children) + 1
        return height > 0 ? height : 1
    }


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
            {padding ? <div style={{height: `calc(100% * ${lineHeight}`}} className="hierarchy-line"></div> : ''}
            <div
                style={{
                    background: selectedId === id ? 'var(--highlight-color)': '',
                    marginLeft: id.split('-').length === 1 ? '13px' : ''
                }}
                className="panel-element-icon">
            </div>
            <div onChange={() => test()} className="panel-element-name">
                element {id}
            </div>
        </div>
    )
}

export default PanelElement

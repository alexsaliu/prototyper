import React, { useState,  useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './panelElement.css'

import {
    setSelectedElementId,
    setHoveredElementId
} from '../../store/actions/actions.js'

const PanelElement = ({id, level}) => {
    const [margin, setMargin] = useState(0)
    const [lineHeight, setLineHeight] = useState(1)
    const [highlight, setHighlight] = useState(false)

    const selectedId = useSelector(state => state.editor.selectedElementId)
    const hoveredId = useSelector(state => state.editor.hoveredElementId)
    const elements = useSelector(state => state.editor.elements)
    const dispatch = useDispatch()

    useEffect(() => {
        setLineHeight(calculateLineHeight(id, elements))
    }, [elements])

    useEffect(() => {
        const thisElementId = id.split('-')
        const level = thisElementId.length - 1
        setMargin(level)
    }, [id])

    useEffect(() => {
        const thisElementId = id.split('-')
        const selectedElementId = selectedId.split('-')
        const level = thisElementId.length - 1
        setHighlight(compareIdsToLevel(thisElementId, selectedElementId, level))
    }, [selectedId])

    const compareIdsToLevel = (id1, id2, level) => {
        let same = true
        for (let i = 0; i <= level; i++) {
            if (id1[i] !== id2[i]) same = false
        }
        return same
    }

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
            className="panel-element-container"
            style={{
                background: selectedId === id ? '#0e1318': ''
            }}
        >
            <div
                key={id}
                className="panel-element"
                style={{
                    marginLeft: `${margin}rem`,
                    boxShadow: hoveredId === id ? 'inset 0 0 0 1px lightblue' : ''
                }}
                onClick={() => dispatch(setSelectedElementId(id))}
                onMouseEnter={() => dispatch(setHoveredElementId(id))}
                onMouseLeave={() => dispatch(setHoveredElementId(''))}
            >
                {
                    margin ?
                    <div
                        style={{
                            height: `calc(100% * ${lineHeight}`,
                            borderColor: highlight ? 'var(--highlight-color)' : '',
                            zIndex: highlight ? '1' : 0
                        }}
                        className="hierarchy-line">
                    </div> : ''
                }
                <div
                    style={{
                        background: highlight ? 'var(--highlight-color)': '',
                        marginLeft: id.split('-').length === 1 ? '13px' : '',
                        zIndex: highlight ? 1 : 0
                    }}
                    className="panel-element-icon">
                </div>
                <div onChange={() => test()} className="panel-element-name">
                    element{id}
                </div>
            </div>
        </div>
    )
}

export default PanelElement

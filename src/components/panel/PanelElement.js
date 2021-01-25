import React, { useState,  useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getParent } from '../../helpers.js'
import './panelElement.css'

import {
    setSelectedElementId,
    setHoveredElementId
} from '../../store/actions/actions.js'

const PanelElement = ({id}) => {
    const [margin, setMargin] = useState(0)
    const [lineHeight, setLineHeight] = useState(1)
    const [highlight, setHighlight] = useState(false)

    const selectedId = useSelector(state => state.editor.selectedElementId)
    const hoveredId = useSelector(state => state.editor.hoveredElementId)
    const elements = useSelector(state => state.editor.elements)
    const dispatch = useDispatch()

    useEffect(() => {
        const thisElementId = id.split('-')
        const level = thisElementId.length - 1
        setMargin(level)
        setLineHeight(calculateLineHeight(id, elements))
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
        let idArray = id.split('-').map(id => parseInt(id))
        let len = idArray.length
        if (len === 1 || idArray[len - 1] === 0) return 1
        // Get previous siblings
        let siblings = getParent(id, elements).children.slice(0, idArray[len - 1])
        // Count all children in sibling element tree
        const traverse = (array, count=0) => {
            for (const item of array) {
                count += traverse(item.children)
            }
            return count + 1
        }
        return traverse(siblings)
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

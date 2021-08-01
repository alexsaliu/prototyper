import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { generateSpaces } from '../../helpers.js'

import {
    setSelectedElementId,
    setHoveredElementId
} from '../../store/actions/actions.js'

const FormattedHtml = ({element, level}) => {

    const selectedId = useSelector(state => state.editor.selectedElementId)
    const hoveredId = useSelector(state => state.editor.hoveredElementId)
    const dispatch = useDispatch()

    return (
        <div
            style={{
                borderLeft: selectedId === element.id ? '1px solid var(--highlight-color)': '',
                background: selectedId === element.id ? '#293039': ''
            }}
        >
            <div className="element"
                onClick={() => dispatch(setSelectedElementId(element.id))}
                onMouseEnter={() => dispatch(setHoveredElementId(element.id))}
                onMouseLeave={() => dispatch(setHoveredElementId(''))}
                style={{
                    background: hoveredId === element.id ? '#293039': ''
                }}
            >
                <span dangerouslySetInnerHTML={{ __html: generateSpaces(level) }}></span>
                <span className="white">{'<'}</span>
                <span className="red">div </span>
                <span className="green">class</span>
                <span className="white">=</span>
                <span className="yellow">"element{element.id}"</span>
                <span className="white">{'>'}</span>
                {!element.children.length ?
                <span>
                    <span className="white">{'</'}</span>
                    <span className="red">div</span>
                    <span className="white">{'>'}</span>
                </span>
                : ''}
            </div>
                {element.children.map(child => <FormattedHtml element={child} level={level+1} />)}
            {element.children.length ?
            <div className="hello">
                <span dangerouslySetInnerHTML={{ __html: generateSpaces(level) }}></span>
                <span className="white">{'</'}</span>
                <span className="red">div</span>
                <span className="white">{'>'}</span>
            </div>
            : ''}
        </div>
    )
}

export default FormattedHtml

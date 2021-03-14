import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './canvasHeader.css'

import { styleButtons } from './styleButtons.js'
import { getElement } from '../../helpers.js'

import {
    toggleColorPanel,
    updateElements,
    stepHistory
} from '../../store/actions/actions.js'

const CanvasHeader = () => {
    const [color, setColor] = useState('')
    const [elementStyles, setElementStyles] = useState({})

    const selectedId = useSelector(state => state.editor.selectedElementId)
    const elements = useSelector(state => state.editor.elements)
    const colorPanel = useSelector(state => state.editor.colorPanel)
    const dispatch = useDispatch()

    useEffect(() => {
        if (selectedId) setColor(getElement(selectedId, elements).styles.background)
    }, [selectedId])

    useEffect(() => {
        if (!selectedId) return
        const element = getElement(selectedId, elements)
        setElementStyles(element.styles)
    }, [selectedId, elements])

    const changePosition = (position) => {
        const currentElements = [...elements]
        const element = getElement(selectedId, currentElements)
        element.styles = {
            ...element.styles,
            position,
            top: position === 'absolute' ? '0px' : '0px',
            left: position === 'absolute' ? '0px' : '0px',
        }
        dispatch(updateElements(currentElements))
    }

    const applyFlex = (style) => {
        const obj = {}
        obj[style.property] = style.value
        const currentElements = [...elements]
        const element = getElement(selectedId, currentElements)
        element.styles = {
            ...element.styles,
            ...obj
        }
        dispatch(updateElements(currentElements))
    }

    return (
        <div className="canvas-header">
            { selectedId ?
                <div className="canvas-header-element-settings">
                    <div onClick={() => dispatch(toggleColorPanel(!colorPanel))} style={colorPanel ? {'boxShadow': '0px 0px 0px 4px #394c6026'} : {}} className="color-toggle-container">
                        <div style={{background: color}} className="color-toggle"></div>
                    </div>
                    <div className="position-settings">
                        <div style={elementStyles.position === 'relative' ? {background: '#c5c5c5'} : {}} onClick={() => changePosition('relative')} className="canvas-header-button">rel</div>
                        <div style={elementStyles.position === 'absolute' ? {background: '#c5c5c5'} : {}} onClick={() => changePosition('absolute')} className="canvas-header-button">abs</div>
                    </div>
                    <div className="flexbox-settings">
                        {styleButtons.map((button, i) =>
                            <div
                                key={i}
                                style={elementStyles[button.property] === button.value ? {background: '#c5c5c5'} : {}}
                                onClick={() => applyFlex({...button})}
                                className="canvas-header-button"
                            >
                                {button.label}
                            </div>)
                        }
                    </div>
                </div> : ''
            }
            <div className="history-buttons">
                <button onClick={() => dispatch(stepHistory(-1))}>&lsaquo;</button>
                <button onClick={() => dispatch(stepHistory(1))}>&rsaquo;</button>
            </div>
        </div>
    );
}

export default CanvasHeader;

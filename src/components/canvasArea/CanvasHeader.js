import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './canvasHeader.css'

import { getElement } from '../../helpers.js'

import {
    toggleColorPanel,
    updateElements,
    stepHistory
} from '../../store/actions/actions.js'

const CanvasHeader = () => {
    const [color, setColor] = useState('')

    const selectedId = useSelector(state => state.editor.selectedElementId)
    const elements = useSelector(state => state.editor.elements)
    const colorPanel = useSelector(state => state.editor.colorPanel)
    const dispatch = useDispatch()

    useEffect(() => {
        if (selectedId) setColor(getElement(selectedId, elements).styles.background)
    }, [selectedId])

    const changePosition = (position) => {
        const currentElements = [...elements]
        const element = getElement(selectedId, currentElements)
        element.styles = {
            ...element.styles,
            position,
            width: '100%',
            height: '100%'
        }
        console.log(currentElements);
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
                        <div onClick={() => changePosition('relative')} className="canvas-header-button">rel</div>
                        <div onClick={() => changePosition('absolute')} className="canvas-header-button">abs</div>
                    </div>
                </div> : ''
            }
            <div>
                <div onClick={() => dispatch(stepHistory(-1))}>back</div>
                <div onClick={() => dispatch(stepHistory(1))}>forwards</div>
            </div>
        </div>
    );
}

export default CanvasHeader;

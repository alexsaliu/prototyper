import React, { useState, useRef } from 'react'
import { useSelector, useDispatch} from 'react-redux'

import Tooltip from '../misc/tooltip/Tooltip.js'

import { getElement } from '../../helpers.js'

import './colorPanel.css';

import {
    updateElements,
    updateRecentColors,
} from '../../store/actions/actions.js'

const Color = ({color, offsetTooltip}) => {
    const [showTooltip, setShowTooltip] = useState(false)

    const selectedId = useSelector(state => state.editor.selectedElementId)
    const elements = useSelector(state => state.editor.elements)
    const recentColors = useSelector(state => state.editor.recentColors)

    const dispatch = useDispatch()

    const timeout = useRef(null)

    const tooltipTrigger = (show) => {
        if (show) {
            timeout.current = setTimeout(() => {setShowTooltip(true)}, 500)
        }
        else {
            clearTimeout(timeout.current)
            setShowTooltip(false)
        }
    }

    const setElementColor = () => {
        const currentElements = [...elements]
        const currentElement = getElement(selectedId, currentElements)
        currentElement.styles = {
            ...currentElement.styles,
            background: color
        }
        dispatch(updateElements(currentElements))
        handelRecentColors(color)
    }

    const handelRecentColors = (color) => {
        let colors = [...recentColors]
        if (colors.includes(color)) {
            colors.splice(colors.indexOf(color), 1)
        }
        else if (colors.length === 6) {
            colors.pop()
        }
        colors.unshift(color)
        dispatch(updateRecentColors(colors))
    }

    return (
        <div
            onClick={() => setElementColor()}
            onMouseOver={() => tooltipTrigger(true)}
            onMouseLeave={() => tooltipTrigger(false)}
            className="color"
            style={{background: color}}
        >
            <div className="tooltip-container">
                <Tooltip show={showTooltip} content={color} offset={offsetTooltip} direction="bottom" />
            </div>
        </div>
    );
}

export default Color;

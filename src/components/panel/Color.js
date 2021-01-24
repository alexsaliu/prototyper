import React, { useState, useRef } from 'react'
import { useSelector, useDispatch} from 'react-redux'

import Tooltip from '../misc/tooltip/Tooltip.js'

import { setElementColor, setRecentColors } from './colorHelpers.js'
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

    const handelElementColorUpdate = () => {
        const updatedElements = setElementColor(color, elements, selectedId)
        const updatedRecentColors = setRecentColors(color, recentColors)
        dispatch(updateElements(updatedElements))
        dispatch(updateRecentColors(updatedRecentColors))
    }

    return (
        <div
            onClick={() => handelElementColorUpdate()}
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

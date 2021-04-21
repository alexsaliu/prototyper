import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getElement, getParent } from '../../../helpers.js'

import './adjuster.css'

import {
    updateElements,
    updateHistory
} from '../../../store/actions/actions.js'

const Adjuster = ({elementRef}) => {
    const [adjusterStyles, setAdjusterStyles] = useState({})
    const [styles, setStyles] = useState({})

    const selectedId = useSelector(state => state.editor.selectedElementId)
    const canvasSize = useSelector(state => state.editor.canvasSize)
    const elements = useSelector(state => state.editor.elements)
    const dispatch = useDispatch()

    useEffect(() => {
        const els = [...elements]
        const element = getElement(selectedId, els)
        const elementDimensions = elementRef.current.getBoundingClientRect()
        const canvasDimensions = document.querySelector('.canvas').getBoundingClientRect()

        element.data = calculatePositions(elementDimensions, canvasDimensions)
        dispatch(updateElements(els))
    }, [])

    useEffect(() => {
        setStyles(getElement(selectedId, elements).styles)
    }, [elements])

    useEffect(() => {
        let adjuster = {}
        let styles = getElement(selectedId, elements).styles
        let parentBorder = styles.border ? parseInt(styles.border) : 0
        adjuster.left = `-${parentBorder}px`
        adjuster.top = `-${parentBorder}px`
        setAdjusterStyles(adjuster)
    }, [elements])

    const calculatePositions = (elementDimensions, canvasDimensions) => {
        return {
            'left': elementDimensions.left - canvasDimensions.left,
            'right': elementDimensions.right - canvasDimensions.right,
            'top': elementDimensions.top - canvasDimensions.top,
            'bottom': elementDimensions.bottom - canvasDimensions.bottom
        }
    }

    const getUnit = (value) => {
        if (typeof value !== 'string') return ''
        if (value.split('%').length > 1) return '%'
        if (value.split('px').length > 1) return 'px'
        return 'rem'
    }

    const changeElementPosition = (move) => {
        return function(e) {
            let currentElements = [...elements]
            const currentElement = getElement(selectedId, currentElements)
            const styles = currentElement.styles
            const unit = getUnit(styles.width)
            let parent = getParent(selectedId, elements)

            const calculatePercentage = (mouseMovement, parentSize) => {
                let value = mouseMovement / parentSize * 100
                return parseFloat(value.toFixed(2))
                // return +(Math.round(value + "e+4")  + "e-4")
            }

            if (styles.position === 'relative') {
                move.top = false
                move.left = false
            }

            if (!parent) {
                parent = {}
                parent.data = {width: canvasSize[0], height: canvasSize[1]}
            }

            currentElement.styles = {
                ...styles,
                top: (parseInt(styles.top) + (move.top ? move.top === "opposite" ? -e.movementY : e.movementY : '')) + 'px',
                left: (parseInt(styles.left) + (move.left ? move.left === "opposite" ? -e.movementX : e.movementX : '')) + 'px',
                height: (parseFloat(styles.height) + (move.height ? move.height === "opposite" ? calculatePercentage(-e.movementY, parent.data.height) : calculatePercentage(e.movementY, parent.data.height) : '')) + unit,
                width: (parseFloat(styles.width) + (move.width ? move.width === "opposite" ? calculatePercentage(-e.movementX, parent.data.width) : calculatePercentage(e.movementX, parent.data.width) : '')) + unit,
            }

            const elementDimensions = elementRef.current.getBoundingClientRect()
            const canvasDimensions = document.querySelector('.canvas').getBoundingClientRect()
            currentElement.data = calculatePositions(elementDimensions, canvasDimensions)

            dispatch(updateElements(currentElements));
        }
    }

    const commenceMovingElement = (params) => {
        const mouseMove = changeElementPosition(params)
        window.addEventListener('mousemove', mouseMove)
        window.addEventListener('mouseup', function mouseUp() {
            window.removeEventListener('mousemove', mouseMove)
            window.removeEventListener('mouseup', mouseUp)
            dispatch(updateHistory())
        })
    }

    return (
        <div
            style={adjusterStyles}
            className="adjuster-container"
        >
            <div
                className="adjuster-dragger"
                onMouseDown={() => commenceMovingElement({top: true, left: true})}
            >
            </div>

            <div onMouseDown={() => commenceMovingElement({left: true, width: "opposite"})} className="adjuster line left"></div>
            <div onMouseDown={() => commenceMovingElement({top: true, height: "opposite"})} className="adjuster line top"></div>
            <div onMouseDown={() => commenceMovingElement({width: true})} className="adjuster line right"></div>
            <div onMouseDown={() => commenceMovingElement({height: true})} className="adjuster line bottom"></div>

            <div onMouseDown={() => commenceMovingElement({top: true, left: true, height: "opposite", width: "opposite"})} className="adjuster square top left"></div>
            <div onMouseDown={() => commenceMovingElement({top: true, height: "opposite", width: true})} className="adjuster square top right"></div>
            <div onMouseDown={() => commenceMovingElement({height: true, width: true})} className="adjuster square bottom right"></div>
            <div onMouseDown={() => commenceMovingElement({left: true, height: true, width: "opposite"})} className="adjuster square bottom left"></div>

            <div className="dimensions">{parseInt(styles.width)} x {parseInt(styles.height)} {getUnit(styles.width)}</div>
        </div>
    );
}

export default Adjuster

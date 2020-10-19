import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getNumericValue } from '../../../helpers.js';
import { calcElementAdjustment } from './movement.js';

import './adjuster.css';

import {
    updateElements,
    setSelectedElementId
} from '../../../store/actions/actions.js';

const Adjuster = () => {
    const [adjusterStyles, setAdjusterStyles] = useState({});
    const [top, setTop] = useState(false);
    const [left, setLeft] = useState(false);

    const selectedId = useSelector(state => state.editor.selectedElementId);
    const elements = useSelector(state => state.editor.elements);
    const dispatch = useDispatch();

    useEffect(() => {
        let adjuster = {};
        let styles = elements[selectedId].styles;
        let parentBorder = styles.border ? getNumericValue(styles.border) : 0;
        let left = getNumericValue(styles.left) - parentBorder / 2;
        let top = getNumericValue(styles.top) - parentBorder / 2;
        adjuster.width = styles.width;
        adjuster.height = styles.height;
        adjuster.left = `-${parentBorder}px`;
        adjuster.top = `-${parentBorder}px`;
        setAdjusterStyles(adjuster);
    }, [elements])

    const changeElementPosition = (move) => {
        return function(e) {
            let els = [...elements]
            let styles = els[selectedId].styles
            els[selectedId].styles = {
                ...els[selectedId].styles,
                top: (getNumericValue(styles.top) + (move.top ? move.top === "opposite" ? -e.movementY : e.movementY : '')) + 'px',
                left: (getNumericValue(styles.left) + (move.left ? move.left === "opposite" ? -e.movementX : e.movementX : '')) + 'px',
                height: (getNumericValue(styles.height) + (move.height ? move.height === "opposite" ? -e.movementY : e.movementY : '')) + 'px',
                width: (getNumericValue(styles.width) + (move.width ? move.width === "opposite" ? -e.movementX : e.movementX : '')) + 'px',
            }
            dispatch(updateElements(els));
        }
    }

    const getMouseMovement = (e) => {
        const x = e.movementX;
        const y = e.movementY;
        return [x, y]
    }

    const commenceMovingElement = (params) => {
        const mouseMove = changeElementPosition(params)
        window.addEventListener('mousemove', mouseMove)
        window.addEventListener('mouseup', function mouseUp() {
            window.removeEventListener('mousemove', mouseMove)
            window.removeEventListener('mouseup', mouseUp)
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

            <div className="dimensions">{elements[selectedId].styles.width.match(/\d+/)[0]} x {elements[selectedId].styles.height.match(/\d+/)[0]}</div>
        </div>
    );
}

export default Adjuster;

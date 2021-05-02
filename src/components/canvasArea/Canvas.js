import React, {useState, useEffect, useRef} from 'react';
import { useSelector } from 'react-redux';

import './canvas.css';
import Element from '../element/Element.js';

import { getElement } from '../../helpers.js'

const Canvas = () => {
    const [gridPositions, setGridPositions] = useState([])
    const [gridLines, setGridLines] = useState({
        'left': false,
        'top': false
    })
    const [gridLineStyles, setGridLineStyles] = useState({
        'left': {height: '100%', width: '2px'},
        'top': {height: '2px', width: '100%'}
    })

    const canvasSize = useSelector(state => state.editor.canvasSize);
    const elements = useSelector(state => state.editor.elements);
    const selectedId = useSelector(state => state.editor.selectedElementId);

    const state = useSelector(state => state);

    useEffect(() => {
        console.log("%cHi Canva, I'd like to work with you :)", "font-family: monospace; font-size: 1.4em; color: #ffffff; background-color: #00c4cc; padding: 2px");
        console.log("Email: alex.saliu@gmail.com");
    }, [])

    useEffect(() => {
        if (!selectedId) return
        const element = getElement(selectedId, elements)
        const lines = {...gridLines}
        const styles = {...gridLineStyles}
        for (const positions of gridPositions) {
            let match = false
            for (const side of Object.keys(gridLineStyles)) {
                if (element.data[side] - 1 < positions[side] && element.data[side] + 1 > positions[side]) {
                    lines[side] = true
                    match = true
                    const sideStyles = {...styles[side]}
                    sideStyles[side] = element.data[side] + 'px'
                    styles[side] = sideStyles
                }
                else {
                    lines[side] = false
                }
            }
            setGridLines(lines)
            setGridLineStyles(styles)
            if (match) break
        }
    }, [elements])

    useEffect(() => {
        if (selectedId) {
            setGridPositions(traverseElementsForPositions(elements, selectedId))
            console.log(gridPositions);
        }
        else {
            setGridLines({'left': false, 'top': false})
        }
    }, [selectedId])

    const traverseElementsForPositions = (elements, id, positions=[]) => {
        for (const element of elements) {
            if (element.id === id) continue
            positions.push(element.data)
            traverseElementsForPositions(element.children, id, positions)
        }
        return positions
    }


    return (
        <div
            className="canvas"
            style={{
                width: `${canvasSize[0]}px`,
                height: `${canvasSize[1]}px`,
                minWidth: `${canvasSize[0]}px`,
                minHeight: `${canvasSize[1]}px`,
                position: 'relative',
                background: "#ffffff"
            }}
        >
            {elements.map((element, i) => <Element key={i} id={i.toString()} children={element.children} />)}
            {gridLines.left ? <div style={gridLineStyles.left} className="gridline"></div> : ''}
            {gridLines.top ? <div style={gridLineStyles.top} className="gridline"></div> : ''}
        </div>
    );
}

export default Canvas;

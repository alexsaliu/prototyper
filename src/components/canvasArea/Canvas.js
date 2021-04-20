import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';

import './canvas.css';
import Element from '../element/Element.js';

import { getElement } from '../../helpers.js'

const Canvas = () => {
    const [gridPositions, setGridPositions] = useState([])
    const [gridLine, setGridLine] = useState(false)
    const [gridLineStyle, setGridLineStyle] = useState({height: '100%', width: '2px'})

    const canvasSize = useSelector(state => state.editor.canvasSize);
    const elements = useSelector(state => state.editor.elements);
    const selectedId = useSelector(state => state.editor.selectedElementId);

    useEffect(() => {
        console.log("%cHi Canva, I'd like to work with you :)", "font-family: monospace; font-size: 1.4em; color: #ffffff; background-color: #00c4cc; padding: 2px");
        console.log("Email: alex.saliu@gmail.com");
    }, [])

    // useEffect(() => {
    //     console.log(gridPositions);
        
    // }, [gridPositions])

    useEffect(() => {
        console.log("Elements updated")
        console.log(gridPositions[0]?.left)
        // see if gridline matches
        const element = getElement(selectedId, elements)
        for (const positions of gridPositions) {
            console.log(positions);
            
            console.log(element.data.left);
            console.log(positions.left);
            console.log(element.data.left < positions.left);
            console.log(element.data.left + 5 > positions.left);
            
            if (element.data.left - 1 < positions.left && element.data.left + 1 > positions.left) {
                setGridLine(true)
                const style = {...gridLineStyle}
                style.left = element.data.left - 200 + 'px'
                setGridLineStyle(style)
                break
            }
            else {
                setGridLine(false)
            }
        }
    }, [elements])

    useEffect(() => {
        if (selectedId) {
            setGridPositions(traverseElementsForPositions(elements, selectedId))
            console.log(gridPositions);
            
        }
        else {
            setGridLine(false)
        }
    }, [selectedId])

    const traverseElementsForPositions = (elements, id, positions=[]) => {
        for (const element of elements) {
            if (element.id === id) continue
            positions.push(element.data)
            traverseElementsForPositions(element.children, id)
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
            {gridLine ? <div style={gridLineStyle} className="gridline"></div> : ''}
        </div>
    );
}

export default Canvas;

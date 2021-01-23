import React from 'react';
import { useSelector } from 'react-redux';

import './canvas.css';
import Element from '../element/Element.js';

const Canvas = () => {
    const canvasSize = useSelector(state => state.editor.canvasSize);
    const elements = useSelector(state => state.editor.elements);

    return (
        <div
            className="canvas"
            style={{minWidth: `${canvasSize[0]}px`, minHeight: `${canvasSize[1]}px`, position: 'relative', background: "#ffffff"}}
        >
            {elements.map((element, i) => <Element key={i} id={i.toString()} children={element.children} />)}
        </div>
    );
}

export default Canvas;

import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './panel.css';

import ColorPanel from './ColorPanel.js';
import { ReactComponent as Toggle } from './paneltoggle.svg';
import { ReactComponent as Caret } from './caret.svg';

import {
    setCanvasSize,
    updateElements,
    setSelectedElementId,
    toggleColorPanel
} from '../../store/actions/actions.js';

const Panel = () => {
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [sidebarItem, setSidebarItem] = useState(1);

    const canvasSize = useSelector(state => state.editor.canvasSize);
    const selectedId = useSelector(state => state.editor.selectedElementId);
    const elements = useSelector(state => state.editor.elements);
    const colorPanel = useSelector(state => state.editor.colorPanel);
    const dispatch = useDispatch();

    useEffect(() => {
        setWidth(canvasSize[0])
        setHeight(canvasSize[1])
    }, [canvasSize])

    useEffect(() => {
        dispatch(toggleColorPanel(false))
    }, [sidebarItem])

    const updateCanvasSize = () => {
        if (isNaN(width) || isNaN(height)) return;
        dispatch(setCanvasSize([parseInt(width), parseInt(height)]));
    }

    const addElement = () => {
        const id = elements.length
        const newElement = {
            'id': id,
            'type': 'div',
            'styles': {
                'left': '0px',
                'top': '0px',
                'width': '200px',
                'height': '100px',
                'border': '1px solid grey',
                'position': 'absolute',
                'boxSizing': 'borderBox',
            },
        }
        dispatch(updateElements(elements.concat(newElement)))
        dispatch(setSelectedElementId(id))
    }

    const deleteElement = () => {
        const updatedElements = [...elements]
        updatedElements.splice(selectedId, 1)
        dispatch(updateElements(updatedElements));
    }

    return (
        <div className="side-panel">
            <div className="sidebar">
                {
                    sidebarItem && !colorPanel ?
                    <div style={{top: `${sidebarItem * 72 - 72}px`}} className="sidebar-item-cover"></div>
                    : ''
                }
                <div onClick={() => setSidebarItem(1)} className="sidebar-item">
                    Item 1
                </div>
                <div onClick={() => setSidebarItem(2)} className="sidebar-item">
                    Item 1
                </div>
                <div onClick={() => setSidebarItem(3)} className="sidebar-item">
                    Item 1
                </div>
            </div>
            {
                sidebarItem ?
                <div className="panel">
                    <input onChange={(e) => setWidth(e.target.value)} type="text" value={width} />
                    <input onChange={(e) => setHeight(e.target.value)} type="text" value={height} />
                    <button onClick={() => updateCanvasSize()}>Update</button>
                    <button onClick={() => addElement()}>Add Element</button>
                    <button onClick={() => deleteElement()}>Delete Element</button>
                </div>
                : ''
            }
            {
                colorPanel ? <ColorPanel /> : ''
            }
            {
                sidebarItem && !colorPanel ?
                <div onClick={() => {setSidebarItem(0)}} className="panel-toggle">
                    <Toggle />
                    <Caret className="caret" />
                </div>
                : ''
            }
        </div>
    );
}

export default Panel;

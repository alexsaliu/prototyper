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
    setHoveredElementId,
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

    const handelSideBarClick = (item) => {
        setSidebarItem(item)
        dispatch(toggleColorPanel(false))
    }

    const updateCanvasSize = () => {
        if (isNaN(width) || isNaN(height)) return;
        dispatch(setCanvasSize([parseInt(width), parseInt(height)]));
    }

    const addElement = () => {
        const id = elements.length
        const newElement = {
            id,
            type: 'div',
            styles: {
                'left': '0px',
                'top': '0px',
                'width': '200px',
                'height': '100px',
                'border': '1px solid grey',
                'position': 'absolute',
                'boxSizing': 'borderBox',
            },
            children: []
        }
        dispatch(updateElements(elements.concat(newElement)))
        dispatch(setSelectedElementId(id))
    }

    const deleteElement = () => {
        const updatedElements = [...elements]
        updatedElements.splice(selectedId, 1)
        dispatch(setSelectedElementId(-1))
        dispatch(updateElements(updatedElements));
    }

    const test = () => {
        console.log("test");
    }

    return (
        <div className="side-panel">
            <div className="sidebar">
                {
                    sidebarItem && !colorPanel ?
                    <div style={{top: `${sidebarItem * 72 - 72}px`}} className="sidebar-item-cover"></div>
                    : ''
                }
                <div onClick={() => handelSideBarClick(1)} className="sidebar-item">
                    Item 1
                </div>
                <div onClick={() => handelSideBarClick(2)} className="sidebar-item">
                    Item 2
                </div>
                <div onClick={() => handelSideBarClick(3)} className="sidebar-item">
                    Item 3
                </div>
            </div>
            {
                sidebarItem === 1 ?
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
                sidebarItem === 2 ?
                <div className="panel">
                    {elements.map((element, i) =>
                        <div
                        key={i}
                        className="panel-element"
                        style={{background: selectedId === i ? '#0e1318': ''}}
                        onClick={() => dispatch(setSelectedElementId(i))}
                        onMouseEnter={() => dispatch(setHoveredElementId(i))}
                        onMouseLeave={() => dispatch(setHoveredElementId(-1))}
                        >
                            <div style={{background: selectedId === i ? 'var(--highlight-color)': ''}} className="panel-element-icon">
                            </div>
                            <div onChange={() => test()} className="panel-element-name">
                                element {i}
                            </div>
                        </div>)}
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

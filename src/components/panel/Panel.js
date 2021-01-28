import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getElement, getParent, logHtml } from '../../helpers.js'
import './panel.css'

import ColorPanel from './ColorPanel.js'
import PanelElement from './PanelElement.js'

import { ReactComponent as Toggle } from './paneltoggle.svg'
import { ReactComponent as Caret } from './caret.svg'

import {
    setCanvasSize,
    updateElements,
    setSelectedElementId,
    setHoveredElementId,
    toggleColorPanel
} from '../../store/actions/actions.js'

const Panel = () => {
    const [width, setWidth] = useState('')
    const [height, setHeight] = useState('')
    const [sidebarItem, setSidebarItem] = useState(1)
    const [sidebarTitles] = useState(['Elements', 'Settings'])
    const [panelElements, setPanelElements] = useState([])

    const canvasSize = useSelector(state => state.editor.canvasSize)
    const selectedId = useSelector(state => state.editor.selectedElementId)
    const elements = useSelector(state => state.editor.elements)
    const colorPanel = useSelector(state => state.editor.colorPanel)
    const dispatch = useDispatch()

    useEffect(() => {
        setWidth(canvasSize[0])
        setHeight(canvasSize[1])
    }, [canvasSize])

    useEffect(() => {
        setPanelElements(flattenElements(elements))
    }, [elements])

    const flattenElements = (elements, flatArray=[]) => {
        for (const element of elements) {
            flatArray.push(element)
            flatArray.concat(flattenElements(element.children, flatArray))
        }
        return flatArray
    }

    const handelSideBarClick = (item) => {
        setSidebarItem(item)
        dispatch(toggleColorPanel(false))
    }

    const updateCanvasSize = () => {
        if (isNaN(width) || isNaN(height)) return;
        dispatch(setCanvasSize([parseInt(width), parseInt(height)]))
    }

    const addElement = () => {
        const currentElements = [...elements]
        const newElement = {
            id: '',
            type: 'div',
            styles: {
                'left': '0px',
                'top': '0px',
                'width': '200px',
                'height': '100px',
                'background': '#293039',
                'position': 'absolute',
                'boxSizing': 'borderBox',
            },
            children: []
        }
        if (selectedId) {
            const currentElement = getElement(selectedId, currentElements)
            const id = selectedId + `-${currentElement.children.length}`
            newElement.id = id
            currentElement.children.push(newElement)
            dispatch(updateElements(currentElements))
            dispatch(setSelectedElementId(selectedId))
        }
        else {
            const id = elements.length.toString()
            newElement.id = id
            dispatch(updateElements(elements.concat(newElement)))
        }
    }

    const deleteElement = () => {
        let currentElements = [...elements]
        let siblings = currentElements
        if (selectedId.length > 1) siblings = getParent(selectedId, currentElements).children
        const id = selectedId.split('-')
        const level = id.length - 1
        siblings.splice(parseInt(id[level]), 1)
        // Update children Ids
        const updateIds = (array, level, i) => {
            for (const element of array) {
                let oldId = element.id.split('-')
                oldId[level] = i
                element.id = oldId.join('-')
                updateIds(element.children, level, i)
            }
        }
        // Re-index siblings
        for (let i = 0; i < siblings.length; i++) {
            const idArray = siblings[i].id.split('-')
            idArray[level] = i
            siblings[i].id = idArray.join('-')
            updateIds(siblings[i].children, level, i)
        }

        dispatch(setSelectedElementId(''))
        dispatch(updateElements(currentElements));
    }

    const restart = () => {
        dispatch(setSelectedElementId(''))
        dispatch(updateElements([]))
    }

    return (
        <div className="side-panel">
            <div className="sidebar">
                {
                    sidebarItem && !colorPanel ?
                    <div style={{top: `${sidebarItem * 72 - 72}px`}} className="sidebar-item-cover"></div>
                    : ''
                }
                {
                    sidebarTitles.map((item, i) => <div onClick={() => handelSideBarClick(i+1)} className="sidebar-item" key={i}>{item}</div>)
                }
            </div>
            {
                sidebarItem === 1 ?
                <div className="panel">
                    <div className="panel-elements-top">
                        <button onClick={() => addElement()}>Add Element</button>
                        {selectedId ? <button onClick={() => deleteElement()}>Delete Element</button> : ''}
                    </div>
                    <div className="panel-elements-container">
                        {
                            panelElements.map((el, i) => <PanelElement key={i} id={el.id} />)
                        }
                    </div>

                </div>
                : ''
            }
            {
                sidebarItem === 2 ?
                <div className="panel settings">
                    <div className="canvas-update-container">
                        <input onChange={(e) => setWidth(e.target.value)} type="text" value={width} />
                        <input onChange={(e) => setHeight(e.target.value)} type="text" value={height} />
                        <button onClick={() => updateCanvasSize()}>Update</button>
                    </div>
                    <div className="button-container">
                        <button onClick={() => logHtml(elements)}>console.log html</button>
                        <button onClick={() => restart()}>Restart Design</button>
                    </div>
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

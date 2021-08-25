import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getElement, getParent, logHtml, randomHex, createNewElement } from '../../helpers.js'
import './panel.css'

import ColorPanel from './ColorPanel.js'
import PanelElement from './PanelElement.js'
import FormattedHtml from './FormattedHtml.js'

import { ReactComponent as Toggle } from './paneltoggle.svg'
import { ReactComponent as Caret } from './caret.svg'

import {
    setCanvasSize,
    updateElements,
    setSelectedElementId,
    setHoveredElementId,
    toggleColorPanel,
    selectProject,
    updateHistory,
    setDisableStylesInput
} from '../../store/actions/actions.js'

import {
    saveProject
} from '../../store/actions/actions2.js'

const Panel = () => {
    const [width, setWidth] = useState('')
    const [height, setHeight] = useState('')
    const [sidebarItem, setSidebarItem] = useState(1)
    const [sidebarTitles] = useState(['Elements', 'Settings', 'Styles', 'Projects'])
    const [panelElements, setPanelElements] = useState([])
    const [elementStyles, setElementStyles] = useState({})
    const [customHtml, setCustomHtml] = useState('')

    const state = useSelector(state => state.editor)
    const canvasSize = useSelector(state => state.editor.canvasSize)
    const selectedId = useSelector(state => state.editor.selectedElementId)
    const hoveredId = useSelector(state => state.editor.hoveredElementId)
    const elements = useSelector(state => state.editor.elements)
    const colorPanel = useSelector(state => state.editor.colorPanel)
    const disableStylesInput = useSelector(state => state.editor.disableStylesInput)

    const projects = useSelector(state => state.other.projects)

    const dispatch = useDispatch()

    useEffect(() => {
        setWidth(canvasSize[0])
        setHeight(canvasSize[1])
    }, [canvasSize])

    useEffect(() => {
        setPanelElements(flattenElements(elements))
    }, [elements])

    useEffect(() => {
        if (selectedId) setElementStyles(getElement(selectedId, elements).styles)
    }, [selectedId, elements])

    useEffect(() => {
        if (customHtml.length < 1) return
        let el = document.createElement('div')
        el.innerHTML = customHtml
        el = el.children[0]
        console.log(el);
        if (el?.style) console.log(el.style);

        function recurse(element, elements=[], id=0) {
            let el = createNewElement()
            el.id = id + ''
            elements.push(el)
            let styles = getStyles(element)
            for (const style of styles) {
                el.styles[toCamelCase(style)] = toCamelCase(element.style[style])
            }
            let children = element.children
            for (let i = 0; i < children.length; i++) {
                recurse(children[i], el.children, id + '-' + i)
            }
            return elements
        }

        function toCamelCase(string) {
            let s = string.split('-')
            if (s.length < 2) return string
            s[0].trim()
            s[1].trim()
            let secondWord = s[1].split('')
            secondWord[0] = secondWord[0].toUpperCase()
            s[1] = secondWord.join('')
            return s.join('')
        }

        function getStyles(el) {
            let styles = el.getAttribute('style')
            if (styles) {
                styles = styles.split(/:|;/)
                styles = styles.filter((item, i) => (i+1)%2).map(item => item.trim())
                styles.pop()
            }
            return styles || []
        }

        let result = []
        if (el) result = dispatch(updateElements(recurse(el)))
    }, [customHtml])

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
                'width': '50%',
                'height': '50%',
                'background': '#cfcfcf',
                'position': 'relative',
                'boxSizing': 'borderBox',
                'display': 'flex'
            },
            data: {},
            children: []
        }
        newElement.styles.background = randomHex()
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
        dispatch(updateHistory())
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
        dispatch(updateElements(currentElements))
        dispatch(updateHistory())
    }

    const restart = () => {
        dispatch(setSelectedElementId(''))
        dispatch(updateElements([]))
    }

    const save = () => {
        const projectsCopy = [...projects]
        projectsCopy.push({...state})
        dispatch(saveProject(JSON.parse(JSON.stringify(projectsCopy))))
    }

    const handelSelectProject = (index) => {
        const project = projects[index]
        if (!project) return
        dispatch(selectProject(JSON.parse(JSON.stringify(project))))
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
                    <div className='html'>
                        {elements.map((element, i) => <FormattedHtml element={element} level={0} key={i} />)}
                    </div>
                    <textarea
                        placeholder="Paste HTML"
                        onFocus={() => dispatch(setDisableStylesInput(true))}
                        onBlur={() => dispatch(setDisableStylesInput(false))}
                        onChange={(e) => setCustomHtml(e.target.value)}
                    ></textarea>
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
                        <button onClick={() => restart()}>Restart Project</button>
                        <button onClick={() => save()}>Save Project</button>
                    </div>
                </div>
                : ''
            }
            {
                sidebarItem === 3 && selectedId ?
                <div className="panel style-panel">
                    {Object.keys(elementStyles).map((key, i) => <div className="panel-style orange" key={i}><span>{key}:</span> {elementStyles[key]};</div>)}
                    {/* <div>
                        <StylesInput />
                    </div> */}
                    <div className="css">
                        {panelElements.map((element, i) =>
                            <div
                                className="class"
                                key={i}
                                style={{background: element.id === selectedId || element.id === hoveredId ? '#293039' : ''}}
                                onClick={() => dispatch(setSelectedElementId(element.id))}
                                onMouseEnter={() => dispatch(setHoveredElementId(element.id))}
                                onMouseLeave={() => dispatch(setHoveredElementId(''))}
                            >
                                <div className="red">.element{element.id} <span className="bracket">{'{'}</span></div>
                                {Object.keys(element.styles).map((key, i) => <div className="css-style orange" key={i}><span className="blue">{key}:</span> {element.styles[key]};</div>)}
                                <div className="bracket red">{'}'}</div>
                            </div>
                        )}
                    </div>
                </div>
                : sidebarItem === 3 ? <div className="panel style-panel"></div> : ''
            }
            {
                sidebarItem === 4 ?
                <div className="panel">
                    {projects.map((project, i) => <div onClick={() => handelSelectProject(i)} className="panel-project" key={i}>Project {i}</div>)}
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

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './editor.css'

import {
    setSelectedElementId,
    toggleColorPanel
} from '../store/actions/actions.js'

import Header from '../components/header/Header.js'
import Panel from '../components/panel/Panel.js'
import Canvas from '../components/canvasArea/Canvas.js'
import CanvasHeader from '../components/canvasArea/CanvasHeader.js'
import StylesInput from './StylesInput.js'

const Editor = () => {
    const selectedId = useSelector(state => state.editor.selectedElementId)
    const disableStylesInput = useSelector(state => state.editor.disableStylesInput)
    const dispatch = useDispatch()

    const unSelectElements = () => {
        dispatch(setSelectedElementId(''))
        dispatch(toggleColorPanel(false))
    }

    return (
        <div className="editor">
            <Header />
            <div className="panel-canvas-container">
                <Panel />
                <div className="canvas-header-container">
                    <CanvasHeader />
                    <div onClick={() => unSelectElements()} className="canvas-container">
                        <Canvas />
                    </div>
                    {selectedId && !disableStylesInput ? <StylesInput key={selectedId} /> : ''}
                </div>
            </div>
        </div>
    );
}

export default Editor;

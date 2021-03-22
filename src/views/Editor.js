import React from 'react'
import { useDispatch } from 'react-redux'
import './editor.css'

import {
    setSelectedElementId,
    toggleColorPanel
} from '../store/actions/actions.js'

import Header from '../components/header/Header.js'
import Panel from '../components/panel/Panel.js'
import Canvas from '../components/canvasArea/Canvas.js'
import CanvasHeader from '../components/canvasArea/CanvasHeader.js'
import Input from './Input.js'

const Editor = () => {

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
                    <Input />
                </div>
            </div>
        </div>
    );
}

export default Editor;

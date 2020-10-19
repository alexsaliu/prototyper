import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './editor.css';

import Header from '../components/header/Header.js';
import Panel from '../components/panel/Panel.js';
import Canvas from '../components/Canvas.js';

const Editor = () => {

    return (
        <div className="editor">
            <Header />
            <div className="panel-canvas-container">
                <Panel />
                <div className="canvas-container">
                    <Canvas />
                </div>
            </div>
        </div>
    );
}

export default Editor;

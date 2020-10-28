import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Color from './Color.js';
import './colorPanel.css';

import {
    updateElements,
} from '../../store/actions/actions.js';

const ColorPanel = () => {
    const [documentColors, setDocumentColors] = useState([]);
    const [defaultColors, setDefaultColors] = useState(
        ['#000000', '#545454', '#737373', '#a6a6a6', '#d9d9d9', '#ffffff',
        '#ff1616', '#ff5757', '#ff66c4', '#cb6ce6', '#8c52ff', '#5e17eb',
        '#03989e', '#00c2cb', '#5ce1e6', '#38b6ff', '#5271ff', '#004aad',
        '#008037', '#7ed957', '#c9e265', '#ffdf5a', '#ffbd59', '#ff914d']
    );

    const colorPanel = useSelector(state => state.editor.colorPanel);
    const elements = useSelector(state => state.editor.elements);
    const dispatch = useDispatch();

    useEffect(() => {
        let colors = new Set();
        for (const element of elements) {
            if (element.styles.background) {
                colors.add(element.styles.background)
            }
        }
        setDocumentColors([...colors])
    }, [elements])

    const determineTooltipOffset = (i, text) => {
        let multiple = text.length > 7 ? text.length - 7 : 0
        if (i % 6 === 0) {
            return multiple * -3
        }
        else if (i % 6 === 1) {
            return multiple * 3
        }
        return 0
    }

    return (
        <div className="color-panel">
            <div className="color-section">
                <div className="color-title">New color</div>
                <div className="color-container">
                    <div className="color color-rainbow">
                        <div className="rainbow"></div>
                    </div>
                </div>
            </div>
            <div className="color-section">
                <div className="color-title">Document colors</div>
                <div className="color-container">
                    {documentColors.map((color, i) =>
                        <Color color={color} key={i} offsetTooltip={determineTooltipOffset(i + 1, color)} />
                    )}
                </div>
            </div>
            <div className="color-section">
                <div className="color-title">Default colors</div>
                <div className="color-container">
                    {defaultColors.map((color, i) =>
                        <Color color={color} key={i} offsetTooltip={determineTooltipOffset(i + 1, color)} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default ColorPanel;

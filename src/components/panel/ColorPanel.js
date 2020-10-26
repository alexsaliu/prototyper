import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Color from './Color.js';
import './colorPanel.css';

import {
    updateElements,
} from '../../store/actions/actions.js';

const ColorPanel = () => {
    const [colors, setColors] = useState(['blue', 'green', 'lightblue', 'pink', 'brickred', 'yellow', 'saddlebrown', 'black']);

    const colorPanel = useSelector(state => state.editor.colorPanel);
    const dispatch = useDispatch();

    const determineTooltipOffset = (i, text) => {
        let direction = 1
        if (i % 6 === 0) {
            direction = -1
        }
        else if (i % 6 === 1) {
            direction = 1
        }
        else {
            return 0
        }

        if (text.length > 7) {
            const multiple = text.length - 7
            return 3 * multiple
        }
        return 0
    }

    return (
        <div className="color-panel">
            <div className="color color-rainbow">
                <div className="rainbow"></div>
            </div>
            <div className="color-container">
                {colors.map((color, i) => 
                    <Color color={color} offsetTooltip={determineTooltipOffset(i + 1, color)} />
                )}
            </div>
        </div>
    );
}

export default ColorPanel;

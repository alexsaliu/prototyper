import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setElementColor, setRecentColors } from './colorHelpers.js'
import { getElement } from '../../helpers.js'

import Color from './Color.js'
import ColorPicker from '../misc/colorPicker/ColorPicker.js'
import './colorPanel.css'

import {
    updateElements,
    updateRecentColors,
    setDisableStylesInput
} from '../../store/actions/actions.js'

const ColorPanel = () => {
    const [documentColors, setDocumentColors] = useState([])
    const [defaultColors] = useState(
        ['#000000', '#545454', '#737373', '#a6a6a6', '#d9d9d9', '#ffffff',
        '#ff1616', '#ff5757', '#ff66c4', '#cb6ce6', '#8c52ff', '#5e17eb',
        '#03989e', '#00c2cb', '#5ce1e6', '#38b6ff', '#5271ff', '#004aad',
        '#008037', '#7ed957', '#c9e265', '#ffdf5a', '#ffbd59', '#ff914d']
    );
    const [showColorPicker, setShowColorPicker] = useState(false)
    const [colorPickerColor, setColorPickerColor] = useState('')

    const colorPanel = useSelector(state => state.editor.colorPanel)
    const elements = useSelector(state => state.editor.elements)
    const selectedId = useSelector(state => state.editor.selectedElementId)
    const recentColors = useSelector(state => state.editor.recentColors)
    const disableStylesInput = useSelector(state => state.editor.disableStylesInput)
    const dispatch = useDispatch()

    useEffect(() => {
        setDocumentColors([...getElementsColors(elements)])
    }, [elements])

    useEffect(() => {
        dispatch(setDisableStylesInput(showColorPicker))
    }, [showColorPicker])

    useEffect(() => {
        return () => dispatch(setDisableStylesInput(false))
    }, [])

    useEffect(() => {
        setShowColorPicker(false)
    }, [selectedId])

    const getElementsColors = (elements, setOfColors = new Set()) => {
        for (const element of elements) {
            setOfColors.add(element.styles.background)
            getElementsColors(element.children, setOfColors)
        }
        return setOfColors
    }

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

    const handelElementColorUpdate = (color) => {
        setColorPickerColor(color.toLowerCase())
        const updatedElements = setElementColor(color, elements, selectedId)
        dispatch(updateElements(updatedElements))
    }

    const handelRecentColors = () => {
        if (!showColorPicker) return
        const updatedRecentColors = setRecentColors(colorPickerColor, recentColors)
        dispatch(updateRecentColors(updatedRecentColors))
    }

    return (
        <div className="color-panel">
            <div className="color-section">
                <div className="color-title">New color</div>
                <div className="color-container">
                    <div onClick={() => {setShowColorPicker(!showColorPicker); handelRecentColors()}} className="color color-rainbow">
                        <div className="rainbow"></div>
                    </div>
                    {showColorPicker ? <div className="colorpicker-container">
                        <ColorPicker startColor={getElement(selectedId, elements).styles.background} changeColor={handelElementColorUpdate} />
                    </div>: ''}
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
            {
                recentColors.length ?
                <div className="color-section">
                    <div className="color-title">Recent colors</div>
                    <div className="color-container">
                        {recentColors.map((color, i) =>
                            <Color color={color} key={i} offsetTooltip={determineTooltipOffset(i + 1, color)} />
                        )}
                    </div>
                </div>
                : ''
            }
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

export default ColorPanel

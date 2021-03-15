import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getElement } from '../../helpers.js'

import {
    updateElements,
    updateHistory
} from '../../store/actions/actions.js'

const StylesInput = () => {
    const [input, _setInput] = useState('')

    const inputRef = useRef(input)

    const setInput = (value) => {
        inputRef.current = value
        _setInput(value)
    }

    const selectedId = useSelector(state => state.editor.selectedElementId)
    const elements = useSelector(state => state.editor.elements)
    const dispatch = useDispatch()

    useEffect(() => {
        if (true) {
            addStyles(input)
        }
        console.log("INPUT: ", input);
    }, [input])

    useEffect(() => {
        function keyPress(e) {
            if (e.key === 'Enter') {
                setInput('')
                return
            }
          setInput(inputRef.current + e.key)
          console.log(inputRef.current);
        }
        document.addEventListener("keypress", keyPress);

        return () => {
            document.removeEventListener('keypress', keyPress)
        }
    }, [])

    const addStyles = (input) => {
        input = input.split('-')
        const styleMap = {
            'w': 'width',
            'h': 'height',
            't': 'top',
            'l': 'left',
            'm': 'margin',
            'p': 'padding',
            'bg': 'background',
        }

        console.log("input 1", input[0]);
        console.log("input 2", input[1]);
        const currentElements = [...elements]
        const element = getElement(selectedId, elements)
        const elementStyles = {...element.styles}
        elementStyles[styleMap[input[0]]] = input[1]
        element.styles = elementStyles
        dispatch(updateElements(currentElements))
    }

    return (
        <div>
            {/* <input onChange={(e) => setInput(e.target.value)} type="text" /> */}
            <div className="styles-input">{input}</div>
        </div>
    );
}

export default StylesInput

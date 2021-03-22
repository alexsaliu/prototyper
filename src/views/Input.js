import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getElement } from '../helpers.js'

import {
    updateElements,
    updateHistory
} from '../store/actions/actions.js'

const StylesInput = () => {
    const [input, _setInput] = useState('')

    const inputRef = useRef(input)
    const inputElRef = useRef(null)

    const setInput = (value) => {
        inputRef.current = value
        _setInput(value)
    }

    const selectedId = useSelector(state => state.editor.selectedElementId)
    const elements = useSelector(state => state.editor.elements)
    const dispatch = useDispatch()

    useEffect(() => {
        document.addEventListener("keydown", keyDown)

        return () => {
            document.removeEventListener('keydown', keyDown)
        }
    }, [])

    const keyDown = (e) => {
        if (e.keyCode > 64 && e.keyCode < 91 && !e.ctrlKey) {
            inputElRef.current.focus()
        }
        if (e.key === 'Enter') {
            addStyles(inputRef.current)
            setInput('')
        }
        return true
    }

    const addStyles = (input) => {
        console.log(input);
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

        const currentElements = [...elements]
        const element = getElement(selectedId, elements)
        const elementStyles = {...element.styles}
        elementStyles[styleMap[input[0]]] = input[1]
        element.styles = elementStyles
        dispatch(updateElements(currentElements))
    }

    return (
        <div className="styles-input">
            <input ref={inputElRef} onChange={(e) => setInput(e.target.value)} value={input} type="text" />
        </div>
    );
}

export default StylesInput

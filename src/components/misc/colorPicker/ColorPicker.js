import React, { useState, useEffect } from 'react'
import convert from 'color-convert'

import './colorPicker.css'

const WIDTH = 258
const HEIGHT = 100

const ColorPicker = ({startColor, changeColor}) => {
    const [color, setColor] = useState('#FF0000')
    const [baseRgb, setBaseRgb] = useState([255, 0, 0])
    const [selectorPosition, setSelectorPosition] = useState([WIDTH, 0])
    const [colorSliderValue, setColorSliderValue] = useState(0)
    const [changingHexInput, setChangingHexInput] = useState(false)

    useEffect(() => {
        if (!changingHexInput) {
            const newRgb = calculateNewRgb(baseRgb, selectorPosition[0], selectorPosition[1])
            setColor('#' + convert.rgb.hex(newRgb))
        }
    }, [baseRgb, selectorPosition])

    useEffect(() => {
        if (startColor) {
            changeHex(startColor)
        }
    }, [])

    useEffect(() => {
        changeColor(color)
    }, [color])

    const calculateNewRgb = (baseRgb, xPosition, yPosition, width=WIDTH, height=HEIGHT) => {
        let newRgb = [0,0,0];
        for (let i = 0; i < 3; i++) {
            const distanceFromRight = width - xPosition
            const percentageDecimalFromRight = distanceFromRight / width
            const rgbRange = 255 - baseRgb[i]
            const rgb = percentageDecimalFromRight * rgbRange + baseRgb[i]
            newRgb[i] = Math.round(rgb)
        }
        for (let i = 0; i < 3; i++) {
            const distanceFromTop = yPosition
            const percentageDecimalFromTop = distanceFromTop / height
            const rgbRange = newRgb[i]
            const rgb = newRgb[i] - percentageDecimalFromTop * rgbRange
            newRgb[i] = Math.round(rgb)
        }
        return newRgb
    }

    const changeHex = (val) => {
        if (val.length < 1) val = '#'
        if (val.length > 7) val = '#' + val.slice(1, 7)
        if (val.length > 0 && val.length < 7) {
            if (!val.includes('#')) return
        }
        setColor(val)
        const hsl = convert.hex.hsl(val)
        setColorSliderValue(hsl[0])
        updateSelectorPosition(convert.hsl.hsv(hsl))
        setBaseRgb(convert.hsl.rgb([hsl[0], 100, 50]))
    }

    const updateSelectorPosition = (hsv) => {
        const xPosition = hsv[1] * (WIDTH / 100)
        const yPosition = 100 - hsv[2] * (HEIGHT / 100)
        setSelectorPosition([Math.round(xPosition), Math.round(yPosition)])
    }

    const moveColorSelector = (rect) => {
        return (e) => {
            setSelectorPosition(position => {
                let x = position[0] + e.movementX
                let y = position[1] + e.movementY
                if (e.clientY < rect.top + 4) y = 0
                if (e.clientY > rect.top + rect.height - 8) y = HEIGHT
                if (e.clientX < rect.left + 4) x = 0
                if (e.clientX > rect.left + rect.width - 8) x = WIDTH
                return [x, y]
            })
        }
    }

    const setInitialPosition = (e, rect) => {
        let x = e.clientX - rect.left
        let y = e.clientY - rect.top
        x = x > WIDTH ? WIDTH : x
        y = y > HEIGHT ? HEIGHT : y
        return [x, y]
    }

    const handelColorSlider = (e) => {
        const rect = document.querySelector('.containerTop').getBoundingClientRect()
        setSelectorPosition(setInitialPosition(e, rect))
        const windowMouseMove = moveColorSelector(rect)
        document.querySelector('.containerTop').style.cursor = 'none'
        window.addEventListener('mousemove', windowMouseMove)
        window.addEventListener('mouseup', function mouseup() {
            document.querySelector('.containerTop').style.cursor = 'unset'
            window.removeEventListener('mousemove', windowMouseMove)
            window.removeEventListener('mouseup', mouseup)
        })
    }

    return (
        <div className="containerOuter">
            <div>
                <div
                    onMouseDown={(e) => handelColorSlider(e)}
                    className="containerTop"
                >
                    <div className="backgroundContainer" style={{background: `rgb(${baseRgb[0]}, ${baseRgb[1]}, ${baseRgb[2]})`}}></div>
                    <div className="backgroundWhite"></div>
                    <div className="backgroundBlack"></div>
                    <div className="colorSelector" style={{left: `${selectorPosition[0]}px` ,top: `${selectorPosition[1]}px`,}}></div>
                </div>
                <div className="colorSliderBar">
                    <input onChange={(e) => {setBaseRgb(convert.hsl.rgb(parseInt(e.target.value), 100, 50)); setColorSliderValue(e.target.value)}} value={colorSliderValue} className="inputSlider" type="range" min="0" max="360"/>
                </div>
                <input onBlur={() => setChangingHexInput(false)} onFocus={() => setChangingHexInput(true)} onChange={(e) => changeHex(e.target.value)} className="hexInput" value={color} type="text" />
            </div>
        </div>
    );
}

export default ColorPicker

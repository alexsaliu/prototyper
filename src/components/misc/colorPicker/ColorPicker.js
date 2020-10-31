import React, { useState, useEffect } from 'react';

import './colorPicker.css';

const ColorPicker = () => {
    const [color, setColor] = useState('#FF0000');
    const [selectorPosition, setSelectorPosition] = useState([20, 20]);
    const [moveColorSelector, setMoveColorSelector] = useState(false);
    const [startingMouse, setStartingMouse] = useState(false);
    const [mousePosition, setMousePosition] = useState(false);

    const [colorSliderValue, setColorSliderValue] = useState(0);

    useEffect(() => {
        // if (startingMouse) {
        //     const backgroundRgb = convert(color);
        //     console.log("backgroundRgb: ", backgroundRgb);
        //     let newRgb = [0,0,0];
        //     for (let i = 0; i < 3; i++) {
        //         const axisDistanceFromRight = 255 - newPosition[0];
        //         const percentageDecimalFromRight = axisDistanceFromRight / 255;
        //         const axisRgbRange = 255 - backgroundRgb[i];
        //         const rgb = percentageDecimalFromRight * axisRgbRange + backgroundRgb[i];
        //         newRgb[i] = Math.round(rgb);
        //     }
        //     for (let i = 0; i < 3; i++) {
        //         const axisDistanceFromTop = newPosition[1];
        //         const percentageDecimalFromTop = axisDistanceFromTop / 125;
        //         const axisRgbRange = newRgb[i];
        //         const rgb = newRgb[i] - percentageDecimalFromTop * axisRgbRange;
        //         newRgb[i] = Math.round(rgb);
        //     }
        //     console.log("newRgb: ", newRgb);
        //     console.log("CONVERTED: ", convert(newRgb));
        //     setColor(convert(newRgb))
        //
        //     // left
        //     setNewSelectorPosition(newPosition);
        // }
        // // calculate rgb value
    }, [mousePosition])

    // mouse down set dragging and get starting mouse POSITION
    // get y proportion
    // get x proportion

    // move


    // mouse move get mouse position and compare to starting position
    // adjust x and y

    const getMouseCoords = (e) => {
        const x = e.clientX;
        const y = e.clientY;
        return [x, y];
    }

    const trackMouse = (e) => {
        if (startingMouse) {
            setMousePosition(getMouseCoords(e));
        }
    }

    const changeHex = (val) => {
        setColor(val);
    }

    const convert = (val) => {
        if (val[0] === "#") {
            const rgb = [];
            for (let i = 0; i < 6; i+=2) {
                const n = parseInt(val[i+1] + val[i+2], 16);
                rgb.push(n >= 0 ? n : 0);
            }
            return rgb
        }
        else {
            let hex = "#";
            for (let i = 0; i < 3; i++) {
                let hexVal = val[i].toString(16);
                hex += hexVal.length === 1 ? "0" + hexVal : hexVal;
            }
            return hex;
        }
    }

    const windowMouseMove = (e) => {
        console.log(document.querySelector('.containerTop').getBoundingClientRect());
        setSelectorPosition(position => {
            let x = position[0] + e.movementX;
            let y = position[1] + e.movementY;
            // if (x > 260 || e.offsetX > 260) x = 260
            // if (x < 0 || e.offsetX < 0) x = 0
            // if (y > 104 || e.offsetY > 104) y = 104
            // if (y < 0 || e.offsetY < 0) y = 0
            return [x, y]
        })
    }

    const handelColorSlider = () => {
        window.addEventListener('mousemove', windowMouseMove);
        window.addEventListener('mouseup', function mouseup() {
            window.removeEventListener('mousemove', windowMouseMove);
            window.removeEventListener('mouseup', mouseup);
        })
    }

    return (
        <div className="containerOuter">
            <div>
                <div
                    onMouseDown={(e) => {handelColorSlider(); setSelectorPosition([e.nativeEvent.offsetX, e.nativeEvent.offsetY])}}
                    className="containerTop"
                >
                    <div className="backgroundContainer" style={{background: color}}></div>
                    <div className="backgroundWhite"></div>
                    <div className="backgroundBlack"></div>
                    <div className="colorSelector" style={{left: `${selectorPosition[0]}px` ,top: `${selectorPosition[1]}px`,}}></div>
                </div>
                <div className="colorSliderBar">
                    <input onChange={(e) => setColorSliderValue(e.target.value)} value={colorSliderValue} className="inputSlider" type="range" min="0" max="255"/>
                </div>
                <input onChange={(e) => changeHex(e.target.value)} className="hexInput" value={color} type="text" />
            </div>
        </div>
    );
}

export default ColorPicker;

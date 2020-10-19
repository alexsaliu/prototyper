import React, { useState, useEffect } from 'react';
import Transparent from './transparent.png';

const ColorPicker = () => {
    const [background, setBackground] = useState('#642BCD');
    const [sampleColorVal, setSampleColorVal] = useState('#642BCD');
    const [selectorPosition, setSelectorPosition] = useState([20, 20]);
    const [newSelectorPosition, setNewSelectorPosition] = useState(false);
    const [colorSliderPosition, setColorSliderPosition] = useState(0);
    const [transparentSliderPosition, setTransparentSliderPosition] = useState(15);
    const [moveColorSelector, setMoveColorSelector] = useState(false);
    const [moveColorSlider, setMoveColorSlider] = useState(false);
    const [moveTransparentSlider, setMoveTransparentSlider] = useState(false);
    const [startingMouse, setStartingMouse] = useState(false);
    const [mousePosition, setMousePosition] = useState(false);

    useEffect(() => {
        convert(background);
    }, [background])

    useEffect(() => {
        if (startingMouse) {
            const mouseMovement = calculateMouseMovement(startingMouse, mousePosition);
            const newPosition = calculateNewSelectorPosition(selectorPosition, mouseMovement)
            // console.log("newPosition: ", newPosition);
            const backgroundRgb = convert(background);
            console.log("backgroundRgb: ", backgroundRgb);
            let newRgb = [0,0,0];
            for (let i = 0; i < 3; i++) {
                const axisDistanceFromRight = 255 - newPosition[0];
                const percentageDecimalFromRight = axisDistanceFromRight / 255;
                const axisRgbRange = 255 - backgroundRgb[i];
                const rgb = percentageDecimalFromRight * axisRgbRange + backgroundRgb[i];
                newRgb[i] = Math.round(rgb);
            }
            for (let i = 0; i < 3; i++) {
                const axisDistanceFromTop = newPosition[1];
                const percentageDecimalFromTop = axisDistanceFromTop / 125;
                const axisRgbRange = newRgb[i];
                const rgb = newRgb[i] - percentageDecimalFromTop * axisRgbRange;
                newRgb[i] = Math.round(rgb);
            }
            console.log("newRgb: ", newRgb);
            console.log("CONVERTED: ", convert(newRgb));
            setSampleColorVal(convert(newRgb));

            // left
            setNewSelectorPosition(newPosition);
        }
        // calculate rgb value
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

    const calculateMouseMovement = (startingCoords, newCoords) => {
        const left = newCoords[0] - startingCoords[0];
        const top = newCoords[1] - startingCoords[1];
        // console.log("MOUSEMOVEMENT: ", left + " " + top);
        return [left, top];
    }

    const calculateNewSelectorPosition = (startingPosition, mouseChanges) => {
        // console.log(startingPosition + " " + mouseChanges);
        let left = startingPosition[0] + mouseChanges[0];
        let top = startingPosition[1] + mouseChanges[1];
        // console.log("selectorPosition: ", left + " " + top);
        return [left, top];
    }

    const endDragging = () => {
        setStartingMouse(false);
        setSelectorPosition(newSelectorPosition);
    }


    const container = {
        width: '255px',
        height: '200px',
        background: '#fff',
        boxShadow: '2px 2px 3px 0px lightgrey',
        borderRadius: '5px',
        overflow: 'hidden',
        position: 'absolute',
        left: '10px',
        top: '10px'
    }

    const containerTop = {
        width: '100%',
        height: '125px',
        position: 'relative',
    }

    const containerBottom = {
        width: '100%',
        height: '75px',
        position: 'relative',
        display: 'flex',
        padding: '10px'
    }

    const containerBottomLeft = {
        width: '20px',
        height: '100%',
        marginRight: '15px'
    }

    const containerBottomRight = {
        width: '200px',
        height: '100%',
    }

    const backgroundContainer = {
        position: 'absolute',
        width: '100%',
        height: '100%'
    }

    const backgroundWhite = {
        background: 'linear-gradient(to right, #fff, rgba(255,255,255,0))',
        position: 'absolute',
        width: '100%',
        height: '100%'
    }

    const sampleColor = {
        width: '100%',
        height: '100%',
        borderRadius: '5px'
    }

    const hexInput = {
        border: '1px solid lightgrey',
        width: '100%',
        height: '20px',
        padding: '4px',
        fontSize: '11px',
        textAlign: 'center',
        borderRadius: '5px',
        color: 'grey',
        textTransform: 'uppercase'
    }

    const backgroundBlack = {
        background: 'linear-gradient(to top, #000, rgba(0,0,0,0))',
        position: 'absolute',
        width: '100%',
        height: '100%'
    }

    const colorSliderBar = {
        background: 'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)',
        width: '100%',
        height: '12px',
        marginBottom: '5px',
        display: 'flex',
        alignItems: 'center',
        position: 'relative'
    }

    const transparentSliderBar = {
        backgroundImage: `url(${Transparent})`,
        width: '100%',
        height: '12px',
        backgroundSize: 'contain',
        backgroundRepeat: 'repeat-x',
        marginBottom: '5px',
        filter: 'opacity(0.6)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative'
    }

    const colorSelector = {
        width: '21px',
        height: '21px'
    }

    const slider = {
        width: '14px',
        height: '14px',
        border: '1px solid #ffffff',
        borderRadius: '14px',
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    const sliderShadow = {
        boxShadow: '0px 0px 3px 0px grey',
        transform: 'translate(-50%, 0%)',
        background: '#ffffff'
    }

    const sliderPoint = {
        width: '1px',
        height: '1px',
        background: '#ffffff',
    }

    const mouseEventCover = {
        width: '100%',
        height: '100%',
        position: 'absolute',
    }

    const changeHex = (val) => {
        setBackground(val);
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
        const el = document.querySelector('#colorSlider');
        let left = el.style.left;
        left = parseInt(left.match(/-?\d+/)[0]);
        const change = e.movementX + left;
        const currentPosition = colorSliderPosition;
        if (change > 200 || change < 0) {
            el.style.left = change > 200 ? '200px' : '0px';
        }
        else {
            el.style.left = change + 'px';
        }
    }

    const handelColorSlider = () => {
        window.addEventListener('mousemove', windowMouseMove);
        window.addEventListener('mouseup', function mouseup() {
            window.removeEventListener('mousemove', windowMouseMove);
            window.removeEventListener('mouseup', mouseup);
            console.log("removed");
        })
    }

    return (
        <div style={container}>
            <div
                style={containerTop}
            >
                <div style={{...backgroundContainer, background: background}}></div>
                <div style={backgroundWhite}></div>
                <div style={backgroundBlack}></div>
                <div style={{...slider, ...colorSelector, left: `${newSelectorPosition[0]}px` ,top: `${newSelectorPosition[1]}px`,}}>
                    <div style={sliderPoint}></div>
                </div>
                <div
                    onMouseDown={(e) => {setStartingMouse(getMouseCoords(e)); setNewSelectorPosition([e.nativeEvent.offsetX, e.nativeEvent.offsetY]); setSelectorPosition([e.nativeEvent.offsetX, e.nativeEvent.offsetY])}}
                    onMouseMove={(e) => trackMouse(e)}
                    onMouseUp={() => endDragging()}
                    onMouseLeave={() => endDragging()}
                    style={mouseEventCover}
                ></div>
            </div>
            <div style={containerBottom}>
                <div style={containerBottomLeft}>
                    <div style={{...sampleColor, background: sampleColorVal}}></div>
                </div>
                <div style={containerBottomRight}>
                    <div style={colorSliderBar}>
                        <div id="colorSlider" onMouseDown={() => handelColorSlider()} style={{...slider, ...sliderShadow, left: `${colorSliderPosition}px`}}></div>
                    </div>
                    <div style={transparentSliderBar}>
                        <div style={{...slider, ...sliderShadow, left: `${transparentSliderPosition}%`}}></div>
                    </div>
                    <input onChange={(e) => changeHex(e.target.value)} style={hexInput} value={sampleColorVal} type="text" />
                </div>
            </div>
        </div>
    );
}

export default ColorPicker;

import React, { useState, useEffect } from 'react';

import './colorPicker.css';

const ColorPicker = () => {
    const [color, setColor] = useState('#FF0000');
    const [backgroundRgb, setBackgroundRgb] = useState([255, 0, 0]);
    const [selectorPosition, setSelectorPosition] = useState([20, 20]);
    const [colorSliderValue, setColorSliderValue] = useState(0);

    useEffect(() => {
        // h 360 - 0
        // s 0 - 100% left to right
        // l 0 - 50% bottom to top | 0 - 50 right to left

        let s = selectorPosition[0] / 260 * 100;
        const ly = Math.round((100 - selectorPosition[0] / 260 * 100) / 2);
        const lx = Math.round((100 - selectorPosition[1] / 104 * 100) / 2);
        let l = ly + lx;

        const hex = hslToHex(360, s, l);
        console.log(hex);
        console.log("s: ", s);
        console.log("l: ", l);

            // console.log("backgroundRgb: ", backgroundRgb);
            // let newRgb = [0,0,0];
            // for (let i = 0; i < 3; i++) {
            //     const distanceFromRight = 260 - selectorPosition[0];
            //     const percentageDecimalFromRight = distanceFromRight / 260;
            //     const rgbRange = 255 - backgroundRgb[i];
            //     const rgb = percentageDecimalFromRight * rgbRange + backgroundRgb[i];
            //     newRgb[i] = Math.round(rgb);
            // }
            // for (let i = 0; i < 3; i++) {
            //     const distanceFromTop = selectorPosition[1];
            //     const percentageDecimalFromTop = distanceFromTop / 104;
            //     const rgbRange = newRgb[i];
            //     const rgb = newRgb[i] - percentageDecimalFromTop * rgbRange;
            //     newRgb[i] = Math.round(rgb);
            // }
            // console.log("CONVERTED: ", convert(newRgb));
            // setColor(convert(newRgb));

    }, [selectorPosition])

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

    const hslToHex = (h, s, l) => {
        h /= 360;
        s /= 100;
        l /= 100;
        let r, g, b;
        if (s === 0) {
            r = g = b = l; // achromatic
        }
        else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }
        const toHex = x => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
        };
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }

    const moveColorSelector = (rect) => {
        return (e) => {
            setSelectorPosition(position => {
                let x = position[0] + e.movementX;
                let y = position[1] + e.movementY;
                if (e.clientY < rect.top + 4) y = 0
                if (e.clientY > rect.top + rect.height - 8) y = 104
                if (e.clientX < rect.left + 4) x = 0
                if (e.clientX > rect.left + rect.width - 8) x = 260
                return [x, y]
            })
        }
    }

    const setInitialPosition = (e, rect) => {
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        x = x > 260 ? 260 : x;
        y = y > 104 ? 104 : y;
        return [x, y];
    }

    const handelColorSlider = (e) => {
        const rect = document.querySelector('.containerTop').getBoundingClientRect();
        setSelectorPosition(setInitialPosition(e, rect));
        const windowMouseMove = moveColorSelector(rect);
        document.querySelector('.containerTop').style.cursor = 'none';
        window.addEventListener('mousemove', windowMouseMove);
        window.addEventListener('mouseup', function mouseup() {
            document.querySelector('.containerTop').style.cursor = 'unset';
            window.removeEventListener('mousemove', windowMouseMove);
            window.removeEventListener('mouseup', mouseup);
        })
    }

    return (
        <div className="containerOuter">
            <div>
                <div
                    onMouseDown={(e) => handelColorSlider(e)}
                    className="containerTop"
                >
                    <div className="backgroundContainer" style={{background: `rgb(${backgroundRgb[0]}, ${backgroundRgb[1]}, ${backgroundRgb[2]})`}}></div>
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

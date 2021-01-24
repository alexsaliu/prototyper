import { getElement } from '../../helpers.js'

export const setElementColor = (color, elements, id) => {
    const currentElements = [...elements]
    const currentElement = getElement(id, currentElements)
    currentElement.styles = {
        ...currentElement.styles,
        background: color
    }
    return currentElements
}

export const setRecentColors = (color, recentColors) => {
    let colors = [...recentColors]
    if (colors.includes(color)) {
        colors.splice(colors.indexOf(color), 1)
    }
    else if (colors.length === 6) {
        colors.pop()
    }
    colors.unshift(color)
    return colors
}

export const getElement = (id, elements) => {
    id = id.split('-')
    if (id.length < 2) return elements[id[0]]
    let element = elements[parseInt(id[0])]
    for (let i = 1; i < id.length; i++) {
        element = element.children[parseInt(id[i])]
    }
    return element
}

export const getParent = (id, elements) => {
    id = id.split('-')
    if (id.length < 2) return false
    id.pop()
    id = id.join("-")
    return getElement(id, elements)
}

export const randomHex = () => {
    let hex = '#'
    for (let i = 0; i < 3; i++) {
        let rgbVal = Math.round(Math.random() * 255)
        let hexVal = rgbVal.toString(16)
        hexVal = hexVal.length === 1 ? "0" + hexVal : hexVal
        hex += hexVal
    }
    return hex
}

export const calculatePositions = (elementDimensions, canvasDimensions) => {
    return {
        'left': elementDimensions.left - canvasDimensions.left,
        'right': elementDimensions.left - canvasDimensions.left + elementDimensions.width,
        'top': elementDimensions.top - canvasDimensions.top,
        'bottom': elementDimensions.top - canvasDimensions.top + elementDimensions.height,
        'width': elementDimensions.width,
        'height': elementDimensions.height,
    }
}

export const logHtml = (elements) => {
    let html = '<div class="container">\n'
    html += elementToHtml(elements)
    html += '</div>'
    console.log(html);
}

const elementToHtml = (elements) => {
    if (!elements.length) return ''
    let elementHtml = ''
    for (const element of elements) {
        let styles = ''
        for (const style in element.styles) {
            styles += removeCamelCasing(style) + ': ' + removeCamelCasing(element.styles[style]) + '; '
        }
        elementHtml += `<div class="element${element.id}" style="${styles}">`
        elementHtml += elementToHtml(element.children)
        elementHtml += '</div>\n'
    }
    return elementHtml
}

const removeCamelCasing = (string) => {
    if (string[0] === '#') return string
    return string.split(/(?=[A-Z])/).join('-').toLowerCase()
}

export const generateSpaces = (n) => {
    let spaces = ''
    for (let i = 0; i < n; i++) {
        spaces += '&nbsp;&nbsp;&nbsp;&nbsp;'
    }
    return spaces
}

export const createNewElement = () => {
    return {
        id: '',
        type: 'div',
        styles: {
            'width': '90%',
            'height': '90%',
            'background': '#cfcfcf',
            'position': 'relative',
            'boxSizing': 'borderBox',
            'display': 'flex'
        },
        data: {},
        children: []
    }
}

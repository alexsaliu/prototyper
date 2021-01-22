export const getElement = (id, elements) => {
    id = id.split('-')
    if (id.length < 2) return elements[id[0]]
    let element = elements[parseInt(id[0])]
    for (let i = 1; i < id.length; i++) {
        element = element.children[parseInt(id[i])]
    }
    console.log(element);
    return element
}

export const getParent = (id, elements) => {
    id = id.split('-')
    if (id.length < 2) return false
    id.pop()
    id = id.join("-")
    return getElement(id, elements)
}

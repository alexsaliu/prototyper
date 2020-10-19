// Get numeric value found in a string
export const getNumericValue = (value) => {
    if (!value) return value;
    return parseInt(value.match(/-?\d+/)[0]);
}

export const increment = (value, setValue) => {
    if (value < 104) {
        setValue(value+1)
    }
}

export const decrement = (value, setValue) => {
    if (value > 1) {
        setValue(value-1)
    }
}
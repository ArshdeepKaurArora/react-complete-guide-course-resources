export const validEmail = (email) => {
    return email.includes('@')
}

export const hadMinLength = (value, minLength) => {
    return value.length >= minLength
}

export const isNotEmpty = (value) => {
    return value.trim() !== ''
}
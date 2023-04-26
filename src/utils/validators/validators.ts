export type FieldValidatorType = (value: string) => string | undefined

export const requiredField: FieldValidatorType = (value) => {
    if (value) return undefined

    return "This field if required"
}

export const maxLengthCreator = (maxLength: number): FieldValidatorType => (value) => {
    if (value !== undefined) {
        if (value.length < maxLength) {
            return undefined
        } else {
            return `Max length ${maxLength} symbols`
        }
    }
}

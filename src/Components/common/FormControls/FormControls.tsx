import React, { FC } from "react"
import { FieldValidatorType } from "../../../utils/validators/validators"
import s from "./FormControls.module.css"
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from "redux-form"

type FormControlsPropsType = {
    meta: WrappedFieldMetaProps
    children: React.ReactNode
}

const FormControl: FC<FormControlsPropsType> = ({children, ...props}) => {
    let hasError = props.meta.touched && props.meta.error

    return (
        <div className= { s.form_control + " " + (hasError ? s.error : "") } >
            <div>
                { children }
            </div>
            {hasError && <span className={ s.span }> { props.meta.error } </span>}
        </div>
    )
}

export function createField<T extends string> (
    placeholder: string | undefined,
    name: T,
    validate: Array<FieldValidatorType>,
    component: FC<WrappedFieldProps>,
    props = {},
    text = ""
) { return ( <>
        <Field placeholder={placeholder} name={name} component={component} validate={validate} {...props}/>{text}
    </>
) }

export const Textarea: FC<WrappedFieldProps> = (props) => {
    let { input, meta, ...restProps } = props
    return <FormControl { ...props }> <textarea {...input } {...restProps } /></FormControl>
}

export const Input: FC<WrappedFieldProps> = (props) => {
    let { input, meta, ...restProps } = props
    return <FormControl { ...props }> <input {...input } { ...restProps } /> </FormControl>
}

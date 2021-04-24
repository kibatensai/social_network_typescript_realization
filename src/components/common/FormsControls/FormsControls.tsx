import React from 'react'
import { Field } from 'redux-form'
import style from './FormsControls.module.css'

//@ts-ignore
const FormControl = ({input, meta, child, ...props}) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={style.formControl + ' ' + (hasError ? style.error : '')}>
            <div>
                {props.children}
            </div>
            { hasError && <span>{meta.error}</span> }
        </div>
    )


}

export const Textarea = (props: any) => {
    const {input, meta, child, ...restProps} = props
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
}

export const Input = (props: any) => {
    const {input, meta, child, ...restProps} = props
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
}

export const Element = (Element: any) => ({ input, meta, ...props }: any) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={`${style.formControl} ${hasError ? style.error : ''}`}>
            <Element {...input} {...props} />
            <div>
                {hasError && <span>{meta.error}</span>}
            </div>
        </div>
    )
}


export const createField = (placeholder: any, name: any, validators: any, component: any, props: any = {}, text: any = '') => {
    return <div>
        <Field placeholder={placeholder} name={name}
            validate={validators}
            component={component}
            {...props} /> {text}
    </div>
}
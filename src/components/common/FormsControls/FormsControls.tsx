import React from 'react'
import style from './FormsControls.module.css'

export const Element = (Element: any) => ({input, meta, ...props}: any) => {

    const hasError = meta.touched && meta.error

    return (
        <div className={`${style.formControl} ${hasError ? style.error : ''}`}>
            <Element {...input} { ...props }/>
            <div>
            { hasError && <span>{meta.error}</span> } 
            </div>
        </div>
    )
}
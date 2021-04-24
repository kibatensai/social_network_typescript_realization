import React from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { required } from '../../utils/validators/validators'
import { Element, createField } from '../common/FormsControls/FormsControls'
import { login } from '../../redux/auth-reducer'
import { Redirect } from 'react-router-dom'
import style from '../../components/common/FormsControls/FormsControls.module.css'
import { AppStateType } from '../../redux/redux-store'

const Input = Element('input')

const LoginForm = ({handleSubmit, error, captchaUrl}: any) => {

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder={'login'} name={'email'} component={Input}
                    validate={[required]} />
            </div>
            <div>
                <Field placeholder={'password'} name={'password'} component={Input} type={'password'}
                    validate={[required]} />
            </div>
            <div>
                <Field type={'checkbox'} name={'rememberMe'} component={Input} /> remember me
            </div>
            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && createField('Symbols from image', 'captcha', [required], Input, {})}
            <div>
                { error && <div className={style.formSummaryError}>{error}</div> }
                <button>Log In</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({ form: 'login' })(LoginForm)

export type LoginFormValuesType = {
    captcha: string
    rememberMe: boolean
    password: string
    email: string
}

// type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>

type LoginFormOwnProps = {
    captchaUrl: string | null
}

export const Login = () => {

    const dispatch = useDispatch()
    const captchaUrl = useSelector<AppStateType, any>(state => state.auth.captchaUrl)
    const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)
    const onSubmit = (formData: any) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe,  formData.captcha))
    }

    return (
        <>
            { isAuth ?
                <Redirect to={'/profile'} />
                :
                <div>
                    <h1>LOGIN</h1>
                    <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
                </div>
            }
        </>
    )
}

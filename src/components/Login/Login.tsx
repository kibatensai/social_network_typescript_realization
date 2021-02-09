import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { required } from '../../utils/validators/validators'
import { Element } from '../common/FormsControls/FormsControls'
import { login } from '../../redux/auth-reducer'
import { Redirect } from 'react-router-dom'
import style from '../../components/common/FormsControls/FormsControls.module.css'

const Input = Element('input')

const LoginForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
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
            <div>
                { props.error && <div className={style.formSummaryError}>{props.error}</div> }
                <button>Log In</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

const Login = (props: any) => {

    const onSubmit = (formData: any) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    return (
        <>
            { props.isAuth ?
                <Redirect to={'/profile'} />
                :
                <div>
                    <h1>LOGIN</h1>
                    <LoginReduxForm onSubmit={onSubmit} />
                </div>
            }
        </>
    )
}

const mapStateToProps = (state: any) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { login })(Login)
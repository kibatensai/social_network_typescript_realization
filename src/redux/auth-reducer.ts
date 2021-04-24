import { authAPI, securityAPI } from './../api/api';
import { Dispatch } from "redux"
import { stopSubmit } from 'redux-form'
import { ThunkAction } from 'redux-thunk';
import { AppStateType } from './redux-store';

const SET_USER_DATA = 'social-network/auth/SET-USER-DATA'
const GET_CAPTCHA_URL_SUCCESS = 'social-network/auth/GET_CAPTCHA_URL_SUCCESS'


let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null // if null, then captcha is not required
}

export type InitialAuthStateType = typeof initialState

const authReducer = (state = initialState, action: any): InitialAuthStateType => {

    switch(action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
                }
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
                }
        default:
            return state
    }
}

type SetUserDataACType = {
    type: typeof SET_USER_DATA,
    payload: DataObject
}
type DataObject = {
    userId: number | null,
    email: string  | null,
    login: string | null,
    isAuth: boolean
}

type GetCaptchaUrlSuccessACType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: {
        captchaUrl: string
    }
}
export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetUserDataACType => ({ type: SET_USER_DATA, payload: {userId, email, login, isAuth}})
export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessACType => ({ type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}})

// ---------- Thunks: ----------

export const getAuthUserData = () => async (dispatch: Dispatch<any>) => {
        let response = await authAPI.me()

        if(response.data.resultCode === 0) {
            let { id, email, login } = response.data.data
            dispatch(setAuthUserData(id, email, login, true))
        }
}


export const login = (email: string, password: string, rememberMe: boolean, captcha: any): ThunkAction<void, AppStateType, unknown, any> => async (dispatch) => {
        let response = await authAPI.login(email, password, rememberMe, captcha)
        if(response.data.resultCode === 0) {
            dispatch(getAuthUserData())
        } else {
            if (response.data.resultCode === 10){
                dispatch(getCaptchaUrl())
            }
            const message = response.data.message.length > 0 ? response.data.message[0] : 'Some error occured'
            dispatch(stopSubmit('login', {_error: message}))
        }

}

export const logout = () => async (dispatch: Dispatch<any>) => {
    let response = await authAPI.logout()

       if(response.data.resultCode === 0) {
          dispatch(setAuthUserData(null, null, null, false))
       }

}

export const getCaptchaUrl = () => async (dispatch: Dispatch) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))

}

export default authReducer
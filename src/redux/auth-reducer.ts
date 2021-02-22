import { authAPI } from './../api/api';
import { Dispatch } from "redux"
import { stopSubmit } from 'redux-form'

const SET_USER_DATA = 'social-network/auth/SET-USER-DATA'


let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

export type InitialAuthStateType = typeof initialState

const authReducer = (state = initialState, action: any): InitialAuthStateType => {
    
    switch(action.type) {
        case SET_USER_DATA:
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
export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetUserDataACType => ({ type: SET_USER_DATA, payload: {userId, email, login, isAuth}})


// ---------- Thunks: ----------

export const getAuthUserData = () => async (dispatch: Dispatch<any>) => {
        let response = await authAPI.me()
                
        if(response.data.resultCode === 0) {
            let { id, email, login } = response.data.data
            dispatch(setAuthUserData(id, email, login, true))
        }
}


export const login = (email: string, password: string, rememberMe: boolean) => async (dispatch: any) => {
        let response = await authAPI.login(email, password, rememberMe)
    
           if(response.data.resultCode === 0) {
              dispatch(getAuthUserData())
           } else {
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

export default authReducer
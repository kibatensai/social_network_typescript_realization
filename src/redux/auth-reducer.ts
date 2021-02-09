import { authAPI } from './../api/api';
import { Dispatch } from "redux"

const SET_USER_DATA = 'SET-USER-DATA'


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

export const getAuthUserData = () => (dispatch: Dispatch<any>) => {
        authAPI.me()
        .then((response: any) => {
           if(response.data.resultCode === 0) {
              let { id, email, login } = response.data.data
              dispatch(setAuthUserData(id, email, login, true))
           }
        })
}


export const login = (email: string, password: string, rememberMe: boolean) => (dispatch: any) => {
        authAPI.login(email, password, rememberMe)
        .then((response: any) => {
           if(response.data.resultCode === 0) {
              dispatch(getAuthUserData())
           }
        })
}

export const logout = () => (dispatch: Dispatch<any>) => {
    authAPI.logout()
    .then((response: any) => {
       if(response.data.resultCode === 0) {
          dispatch(setAuthUserData(null, null, null, false))
       }
    })
}

export default authReducer
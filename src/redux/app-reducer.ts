import { Dispatch } from "redux"
import { getAuthUserData } from "./auth-reducer"

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'


let initialState = {
    initialized: false
}

export type InitialAuthStateType = typeof initialState

const appReducer = (state = initialState, action: any): InitialAuthStateType => {
    
    switch(action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
                }
        default:
            return state 
    }
}

type SetInitializedACType = {
    type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): SetInitializedACType => ({ type: INITIALIZED_SUCCESS})


// ---------- Thunks: ----------

export const initializeApp = () => (dispatch: Dispatch<any>) => {
    const promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
        dispatch(initializedSuccess())
    })
}


export default appReducer

const SET_USER_DATA = 'SET-USER-DATA'


let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: any): InitialStateType => {
    
    switch(action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true
                }
        default:
            return state 
    }
}

type SetUserDataACType = {
    type: typeof SET_USER_DATA,
    data: DataObject
}
type DataObject = {
    userId: number,
    email: string,
    login: string
}
export const setAuthUserData = (userId: number, email: string, login: string): SetUserDataACType => ({ type: SET_USER_DATA, data: {userId, email, login}})



export default authReducer
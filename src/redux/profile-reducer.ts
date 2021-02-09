import { profileAPI } from './../api/api';
import { Dispatch } from 'react';
import { ProfileType } from './../types/types';
const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_STATUS = 'SET-STATUS'

type PostDataType = {
    id: number
    postmsg: string
    likesCount: number
}

let initialState = {
    postData: [
        { id: 1, postmsg: 'Its my first post', likesCount: 10 },
        { id: 2, postmsg: 'Its my second post', likesCount: 15 },
        { id: 3, postmsg: 'Its my third post', likesCount: 7 },
    ] as Array<PostDataType>,
    profile: null as ProfileType | null,
    status: ''
}

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): InitialStateType => {
    
    switch(action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                postmsg: action.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                postData: [...state.postData, newPost],
            }
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        default:
            return state 
    }
}


type AddPostActionCreatorType = {
    type: typeof ADD_POST
    newPostText: string
}

type SetUserProfileActionCreatorType = {
    type: typeof SET_USER_PROFILE
    profile: any
}

type SetStatusActionCreatorType = {
    type: typeof SET_STATUS
    status: string
}


export const addPostActionCreator = (newPostText: string): AddPostActionCreatorType => ( {type: ADD_POST, newPostText} )
export const setUserProfile = (profile: any): SetUserProfileActionCreatorType => ( { type: SET_USER_PROFILE, profile } )
export const setStatus = (status: string): SetStatusActionCreatorType => ( { type: SET_STATUS, status } )


// ---------- Thunks: ----------

export const getUserProfile = (userId: number) => {
    return (dispatch: Dispatch<any>) => {
        profileAPI.getProfile(userId)
        .then((response: any) => {
            dispatch(setUserProfile(response.data))
        })
    }
}

export const getStatus = (userId: number) => {
    return (dispatch: Dispatch<any>) => {
        profileAPI.getStatus(userId)
        .then((response: any) => {
            dispatch(setStatus(response.data))
        })
    }
}

export const updateStatus = (status: string) => {
    return (dispatch: Dispatch<any>) => {
        profileAPI.updateStatus(status)
        .then((response: any) => {
            if(response.data.resultCode === 0) {
                dispatch(setStatus(status))
        }
        })
    }
}


export default profileReducer
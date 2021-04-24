import { profileAPI } from './../api/api';
import { Dispatch } from 'react';
import { ProfileType } from './../types/types';
import { stopSubmit } from 'redux-form/lib/actions';
const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_STATUS = 'SET-STATUS'
const DELETE_POST = 'DELETE-POST'
const SAVE_PHOTO_SUCCESS = 'SAVE-PHOTO-SUCCESS'

export type PostDataType = {
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
    profile: null as any,
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
        case DELETE_POST:
            return {
                ...state,
                postData: state.postData.filter(el => el.id !== action.postId)
            }
        case SAVE_PHOTO_SUCCESS:
            return { ...state, profile: {...state.profile, photos: action.photos}}
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

type DeletePostActionCreatorType = {
    type: typeof DELETE_POST
    postId: number
}

type SavePhotoSuccessActionCreatorType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: any
}

export const addPostActionCreator = (newPostText: string): AddPostActionCreatorType => ( {type: ADD_POST, newPostText} )
export const setUserProfile = (profile: any): SetUserProfileActionCreatorType => ( { type: SET_USER_PROFILE, profile } )
export const setStatus = (status: string): SetStatusActionCreatorType => ( { type: SET_STATUS, status } )
export const deletePost = (postId: number): DeletePostActionCreatorType => ( { type: DELETE_POST, postId } )
export const savePhotoSuccess = (photos: any): SavePhotoSuccessActionCreatorType => ( { type: SAVE_PHOTO_SUCCESS, photos } )


// ---------- Thunks: ----------

export const getUserProfile = (userId: number) =>
    async (dispatch: Dispatch<any>) => {
        const response =  await profileAPI.getProfile(userId)
            dispatch(setUserProfile(response.data))

    }


export const getStatus = (userId: number) =>
    async (dispatch: Dispatch<any>) => {
        const response = await profileAPI.getStatus(userId)

            dispatch(setStatus(response.data))

}


export const updateStatus = (status: string) =>
    async (dispatch: Dispatch<any>) => {
        const response = await profileAPI.updateStatus(status)

            if(response.data.resultCode === 0) {
                dispatch(setStatus(status))
        }

}

export const savePhoto = (file: any) =>
    async (dispatch: Dispatch<any>) => {
        const response = await profileAPI.savePhoto(file)

            if(response.data.resultCode === 0) {
                dispatch(savePhotoSuccess(response.data.data.photos))
        }

}

export const saveProfile = (profile: any) =>
    async (dispatch: Dispatch<any>, getState: any) => {
        const userId = getState().auth.userId
        const response = await profileAPI.saveProfile(profile)
            if(response.data.resultCode === 0) {
                dispatch(getUserProfile(userId))
        } else {
            dispatch(stopSubmit('edit-profile', {_error: response.data.messages[0]}))
            return Promise.reject(response.data.messages[0])
        }

}



export default profileReducer
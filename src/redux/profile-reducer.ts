import { Dispatch } from 'react';
import { usersAPI } from '../api/api';
import { ProfileType } from './../types/types';
const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const SET_USER_PROFILE = 'SET-USER-PROFILE'

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
    newPostText: '',
    profile: null as ProfileType | null
}

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): InitialStateType => {
    
    switch(action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                postmsg: state.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                postData: [...state.postData, newPost],
                newPostText: ''
            }
        }
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newText
            }
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        default:
            return state 
    }
}


type AddPostActionCreatorType = {
    type: typeof ADD_POST
}

type UpdateNewPostTextActionCreatorType = {
    type: typeof UPDATE_NEW_POST_TEXT
    newText: string
}

type SetUserProfileActionCreatorType = {
    type: typeof SET_USER_PROFILE
    profile: any
}

export const addPostActionCreator = (): AddPostActionCreatorType => ( {type: ADD_POST} )
export const updateNewPostTextActionCreator = (text: string): UpdateNewPostTextActionCreatorType => ( {type: UPDATE_NEW_POST_TEXT, newText: text} )
export const setUserProfile = (profile: any): SetUserProfileActionCreatorType => ( { type: SET_USER_PROFILE, profile } )


// ---------- Thunks: ----------

export const getUserProfile = (userId: number) => {
    return (dispatch: Dispatch<any>) => {
        usersAPI.getProfile(userId)
      .then((response: any) => {
          dispatch(setUserProfile(response.data))
  })
    }
}

export default profileReducer
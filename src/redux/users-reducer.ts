import { Dispatch } from 'react';
import { usersAPI } from '../api/api';
import { UserType } from "../types/types"
import { updateObjectInArray } from '../utils/validators/object-helpers';

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_USERS_TOTAL_COUNT = 'SET_USERS_TOTAL_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING' 
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'


let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 50,
    currentPage: 1,
    isFetching: false,
    isFollowingInProgress: [] as Array<number>
}

type InitialStateType = typeof initialState

type ActionType = FollowSuccessACType
                | SetUserACType
                | SetCurrentPageACType
                | SetUsersTotalCountACType
                | toggleIsFetchingACType
                | UnfollowSuccessACType
                | toggleFollowingProgressACType

const usersReducer = (state = initialState, action: ActionType): InitialStateType => {
    
    switch(action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            }
        case SET_USERS:
            return { ...state, users: action.users }
        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.currentPage }
        case SET_USERS_TOTAL_COUNT:
            return { ...state, totalUsersCount: action.count }
        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.isFetching }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return { ...state, 
                     isFollowingInProgress: action.isFetching 
                            ? [...state.isFollowingInProgress, action.userId]
                            : state.isFollowingInProgress.filter(id => id !== action.userId)}
        default:
            return state 
    }
}

type FollowSuccessACType = {
    type: typeof FOLLOW,
    userId: number
}
export const followSuccess = (userId: number): FollowSuccessACType => ({ type: FOLLOW, userId})

type UnfollowSuccessACType = {
    type: typeof UNFOLLOW,
    userId: number
}
export const unfollowSuccess = (userId: number): UnfollowSuccessACType => ({ type: UNFOLLOW, userId})

type SetUserACType = {
    type: typeof SET_USERS,
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUserACType => ({ type: SET_USERS, users })

type SetCurrentPageACType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageACType => ({ type: SET_CURRENT_PAGE, currentPage })

type SetUsersTotalCountACType = {
    type: typeof SET_USERS_TOTAL_COUNT,
    count: number
}
export const setUsersTotalCount = (totalUsersCount: number): SetUsersTotalCountACType => ({ type: SET_USERS_TOTAL_COUNT, count: totalUsersCount })

type toggleIsFetchingACType = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingACType => ({ type: TOGGLE_IS_FETCHING, isFetching })

type toggleFollowingProgressACType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}

export const toggleFollowingProgress = (isFetching: boolean, userId: number): toggleFollowingProgressACType => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId})




// ---------- Thunks: ----------

export const requestUsers = (currentPage: number, pageSize: number) => 
    async (dispatch: Dispatch<any>) => {

        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(currentPage))

        const response = await usersAPI.getUsers(currentPage, pageSize)
            dispatch(toggleIsFetching(false))
            dispatch(setUsers(response.items))
            dispatch(setUsersTotalCount(response.totalCount))
     
}


export const follow = (userId: number) =>  
    async (dispatch: Dispatch<any>) => {

        dispatch(toggleFollowingProgress(true, userId))
        const response = await usersAPI.follow(userId)
       
            if (response.data.resultCode === 0) {
            dispatch(followSuccess(userId))
            }
            dispatch(toggleFollowingProgress(false, userId))
        
}


export const unfollow = (userId: number) =>  
    async (dispatch: Dispatch<any>) => {

        dispatch(toggleFollowingProgress(true, userId))
        const response = await usersAPI.unfollow(userId)
        
            if (response.data.resultCode === 0) {
            dispatch(unfollowSuccess(userId))
            }
            dispatch(toggleFollowingProgress(false, userId))
      
}


export default usersReducer
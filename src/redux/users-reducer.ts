import { UserType } from "../types/types"

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING' 


let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 50,
    currentPage: 1,
    isFetching: false
}

type InitialStateType = typeof initialState

type ActionType = FollowACType
                | SetUserACType
                | SetCurrentPageACType
                | SetUsersTotalCountACType
                | toggleIsFetchingACType
                | UnfollowACType

const usersReducer = (state = initialState, action: ActionType): InitialStateType => {
    
    switch(action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if(u.id === action.userId) {
                        return { ...u, followed: true }
                    }
                    return u
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if(u.id === action.userId) {
                        return { ...u, followed: false }
                    }
                    return u
                })
            }
        case SET_USERS:
            return { ...state, users: action.users }
        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.currentPage }
        case SET_TOTAL_USERS_COUNT:
            return { ...state, totalUsersCount: action.count }
        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.isFetching }
        default:
            return state 
    }
}

type FollowACType = {
    type: typeof FOLLOW,
    userId: number
}
export const follow = (userId: number): FollowACType => ({ type: FOLLOW, userId})

type UnfollowACType = {
    type: typeof UNFOLLOW,
    userId: number
}
export const unfollow = (userId: number): UnfollowACType => ({ type: UNFOLLOW, userId})

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
    type: typeof SET_TOTAL_USERS_COUNT,
    count: number
}
export const setUsersTotalCount = (totalUsersCount: number): SetUsersTotalCountACType => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount })

type toggleIsFetchingACType = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingACType => ({ type: TOGGLE_IS_FETCHING, isFetching })


export default usersReducer
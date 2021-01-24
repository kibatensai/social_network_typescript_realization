import React, { Component, Dispatch } from 'react'
import {connect} from 'react-redux'
import { followAC, setUsersAC, setCurrentPageAC, setUsersTotalCountAC, toggleIsFetchingAC } from '../../redux/users-reducer'
import { Users } from './Users'
import axios from 'axios'
import { PhotosType, UserType } from '../../types/types'
import { AppStateType } from '../../redux/redux-store'
import { Preloader } from '../common/Preloader/Preloader'

type UsersContainerPropsType = {
    currentPage: number
    pagesCount: number
    totalUsersCount: number
    pageSize: number
    users: Array<UserType>
    onFollow: (userId: number) => void
    setCurrentPage: (pageId: number) => void
    setUsers: (users: Array<UserType>) => void
    setTotalUsersCount: (usersCount: number) => void
    photos: PhotosType
    isFetching: boolean
    toggleIsFetching: (isFetching: boolean) => void
}



class UsersContainer extends Component<UsersContainerPropsType> {

    componentDidMount() {
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pagesCount}`)
        .then((response: any) => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(response.data.items)
            this.props.setTotalUsersCount(response.data.totalCount)
        })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pagesCount}`)
        .then((response: any) => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(response.data.items)
        })
    }

    render() { 
        return  <>
                { this.props.isFetching ? <Preloader /> : null}
                <Users totalUsersCount={this.props.totalUsersCount}
                      pageSize={this.props.pageSize}
                      currentPage={this.props.currentPage}
                      onPageChanged={this.onPageChanged}
                      users={this.props.users}
                      onFollow={this.props.onFollow}/>
                </>
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        onFollow: (userId: number) => {
            dispatch(followAC(userId))
        },
        setUsers: (users: Array<UserType>) => {
            dispatch(setUsersAC(users))
        },
        setCurrentPage: (pageNumber: number) => {
            dispatch(setCurrentPageAC(pageNumber))
        },
        setTotalUsersCount: (totalCount: number) => {
            dispatch(setUsersTotalCountAC(totalCount))
        },
        toggleIsFetching: (isFetching: boolean) => {
            dispatch(toggleIsFetchingAC(isFetching))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)
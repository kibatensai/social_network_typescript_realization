import React, { Component } from 'react'
import {connect} from 'react-redux'
import { followSuccess, setCurrentPage, unfollowSuccess, toggleFollowingProgress, requestUsers, follow, unfollow } from '../../redux/users-reducer'
import { Users } from './Users'
import { PhotosType, UserType } from '../../types/types'
import { AppStateType } from '../../redux/redux-store'
import { Preloader } from '../common/Preloader/Preloader'
import { compose } from 'redux'
import { getCurrentPageFromState, getIsFetchingFromState, getIsFollowInProgressFromState, getPageSize, getTotalUsersCountFromState, getUsersFromState } from '../../redux/users-selectors'

type UsersContainerPropsType = {
    currentPage: number
    pagesCount: number
    totalUsersCount: number
    pageSize: number
    users: Array<UserType>,
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setCurrentPage: (pageId: number) => void
    setUsers: (users: Array<UserType>) => void
    setUsersTotalCount: (usersCount: number) => void
    photos: PhotosType
    isFetching: boolean
    toggleIsFetching: (isFetching: boolean) => void
    requestUsers: (currentPage: number, pageSize: number) => void
    toggleFollowingProgress: (isFetching: boolean, userId: number) => void
    isFollowingInProgress: Array<number>
    getUsersThunkCreator: (currentPage: number, pageSize: number) => void
}



class UsersContainer extends Component<UsersContainerPropsType> {

    componentDidMount() {
        const { currentPage, pageSize} = this.props
        this.props.requestUsers(currentPage, pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        const { pageSize } = this.props
        this.props.requestUsers(pageNumber, pageSize)
    }

    render() { 
        return  <>
                { this.props.isFetching ? <Preloader /> : null}
                <Users totalUsersCount={this.props.totalUsersCount}
                      pageSize={this.props.pageSize}
                      currentPage={this.props.currentPage}
                      onPageChanged={this.onPageChanged}
                      users={this.props.users}
                      isFollowingInProgress={this.props.isFollowingInProgress}
                      follow={this.props.follow}
                      unfollow={this.props.unfollow}/>
                </>
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        users: getUsersFromState(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCountFromState(state),
        currentPage: getCurrentPageFromState(state),
        isFetching: getIsFetchingFromState(state),
        isFollowingInProgress: getIsFollowInProgressFromState(state)
    }
}


export default compose(
    connect(mapStateToProps, {followSuccess, unfollowSuccess, setCurrentPage, toggleFollowingProgress, requestUsers, follow, unfollow})
)(UsersContainer)
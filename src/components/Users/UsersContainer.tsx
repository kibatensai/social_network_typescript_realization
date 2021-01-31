import React, { Component } from 'react'
import {connect} from 'react-redux'
import { follow, setUsers, setCurrentPage, setUsersTotalCount, toggleIsFetching, unfollow } from '../../redux/users-reducer'
import { Users } from './Users'
import axios, { AxiosResponse } from 'axios'
import { PhotosType, UserType } from '../../types/types'
import { AppStateType } from '../../redux/redux-store'
import { Preloader } from '../common/Preloader/Preloader'
import { usersAPI } from '../../api/api'

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
    getUsers: (currentPage: number, pageSize: number) => void
}



class UsersContainer extends Component<UsersContainerPropsType> {

    componentDidMount() {
        this.props.toggleIsFetching(true)
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then((data: any) => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(data.items)
            this.props.setUsersTotalCount(data.totalCount)
        })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        this.props.toggleIsFetching(true)
        usersAPI.getUsers(pageNumber, this.props.pageSize).then((data: any) => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(data.items)
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
                      onFollow={this.props.follow}
                      onUnfollow={this.props.unfollow}/>
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

export default connect(mapStateToProps, { 
    follow, unfollow, setUsers, setCurrentPage, setUsersTotalCount, toggleIsFetching
 })(UsersContainer)
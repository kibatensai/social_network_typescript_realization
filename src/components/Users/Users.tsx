import React from 'react'
import style from './Users.module.css'
import userPhoto from '../../assets/images/usermockpng.png'
import { UserType } from '../../types/types'
import { Paginator } from '../common/Paginator/Paginator'
import { User } from './User'

type UsersComponentType = {
    currentPage: number
    totalUsersCount: number
    pageSize: number
    users: Array<UserType>
    isFollowingInProgress: Array<number>
    onPageChanged: (page: number) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}


export const Users = ({ currentPage, totalUsersCount, pageSize, users, isFollowingInProgress, onPageChanged, follow, unfollow }: UsersComponentType) => {

    return ( <div>
            <Paginator currentPage={currentPage}
                        onPageChanged={onPageChanged}
                        totalItemsCount={totalUsersCount}
                        pageSize={pageSize}/>
            {
                users.map( u => <User key={u.id}
                                    user={u}
                                    isFollowingInProgress={isFollowingInProgress}
                                    follow={follow}
                                    unfollow={unfollow}/>)
            }
            </div>
)
    
}
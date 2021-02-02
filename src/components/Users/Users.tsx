import React from 'react'
import style from './Users.module.css'
import userPhoto from '../../assets/images/usermockpng.png'
import { UserType } from '../../types/types'
import { NavLink } from 'react-router-dom'

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

    let pagesCount = Math.ceil(totalUsersCount / pageSize)
        
    let pages = []
    for(let i=1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
            <div>
                <div>
                    {pages.map( p => {
                        return <span key={p} className={currentPage === p ? style.selectedPage : style.otherPage}
                        onClick={() => onPageChanged(p)}>{p}</span>
                    })}
                </div>
            {
                users.map( u => <div key={u.id}>
                    <span>
                        <div>
                            <NavLink to={`/profile/` + u.id}>
                            <img src={ u.photos.small !== null ? u.photos.small : userPhoto } alt='userpic' className={style.userPhoto}/>
                            </NavLink>
                        </div>
                        <div>
                            { u.followed 
                                        ? <button disabled={isFollowingInProgress.some(id => id === u.id)} onClick={ () => { unfollow(u.id)}}>Unfollow</button> 
                                        : <button disabled={isFollowingInProgress.some(id => id === u.id)} onClick={ () => { follow(u.id) }}>Follow</button>}
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <div>tut budet strana</div>
                            <div>tut budet gorod</div>
                        </span>
                    </span>
                </div>)
            }
            </div>
    )
}
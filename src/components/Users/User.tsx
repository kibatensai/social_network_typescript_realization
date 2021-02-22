import React from 'react'
import style from './Users.module.css'
import userPhoto from '../../assets/images/usermockpng.png'
import { NavLink } from 'react-router-dom'
import { UserType } from '../../types/types'

type UserComponentType = {
    user: UserType
    isFollowingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}


export const User = ({ user, isFollowingInProgress, unfollow, follow }: UserComponentType) => {

    return (
                <div>
                    <span>
                        <div>
                            <NavLink to={`/profile/` + user.id}>
                            <img src={ user.photos.small !== null ? user.photos.small : userPhoto } alt='userpic' className={style.userPhoto}/>
                            </NavLink>
                        </div>
                        <div>
                            { user.followed 
                                        ? <button disabled={isFollowingInProgress.some(id => id === user.id)} onClick={ () => { unfollow(user.id)}}>Unfollow</button> 
                                        : <button disabled={isFollowingInProgress.some(id => id === user.id)} onClick={ () => { follow(user.id) }}>Follow</button>}
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{user.name}</div>
                            <div>{user.status}</div>
                        </span>
                        <span>
                            <div>tut budet strana</div>
                            <div>tut budet gorod</div>
                        </span>
                    </span>
                </div>     
    )
}
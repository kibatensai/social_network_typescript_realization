import React from 'react'
import style from './Users.module.css'
import userPhoto from '../../assets/images/usermockpng.png'
import { PhotosType, UserType } from '../../types/types'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

type UsersComponentType = {
    currentPage: number
    totalUsersCount: number
    pageSize: number
    users: Array<UserType>
    onPageChanged: (page: number) => void
    onFollow: (userId: number) => void
    onUnfollow: (userId: number) => void
}


export const Users = ({ currentPage, totalUsersCount, pageSize, users, onPageChanged, onFollow, onUnfollow}: UsersComponentType) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize)
        
    let pages = []
    for(let i=1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const follow = (id: number) => {
            axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${id}`, {}, {
                withCredentials: true,
                headers: {'API-KEY' : '5675685f-9cd0-43c9-b668-1f134f354acb'}
            })
            .then((response: any) => {
                if (response.data.resultCode === 0) {
                onFollow(id)
                }
            })
    }

    const unfollow = (id: number) => {
            axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${id}`, {
                withCredentials: true,
                headers: {'API-KEY' : '5675685f-9cd0-43c9-b668-1f134f354acb'}
            })
            .then((response: any) => {
                if (response.data.resultCode === 0) {
                onUnfollow(id)
                }
            })
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
                                        ? <button onClick={ () => { unfollow(u.id)}}>Unfollow</button> 
                                        : <button onClick={ () => { follow(u.id) }}>Follow</button>}
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
import React from 'react'
import style from './Users.module.css'
import userPhoto from '../../assets/images/usermockpng.png'
import { PhotosType, UserType } from '../../types/types'

type UsersComponentType = {
    currentPage: number
    totalUsersCount: number
    pageSize: number
    users: Array<UserType>
    onPageChanged: (page: number) => void
    onFollow: (userId: number) => void
}


export const Users = ({ currentPage, totalUsersCount, pageSize, users, onPageChanged, onFollow}: UsersComponentType) => {

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
                            <img src={ u.photos.small !== null ? u.photos.small : userPhoto } alt='userpic' className={style.userPhoto}/>
                        </div>
                        <div>
                            { u.followed 
                                        ? <button onClick={ () => { onFollow(u.id)}}>Unfollowed</button> 
                                        : <button onClick={ () => { onFollow(u.id)}}>Followed</button>}
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
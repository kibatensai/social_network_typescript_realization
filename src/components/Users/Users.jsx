import React from 'react'
import style from './Users.module.css'
import userPhoto from '../../assets/images/usermockpng.png'


export const Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
        
    let pages = []
    for(let i=1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
            <div>
                <div>
                    {pages.map( p => {
                        return <span key={p} className={props.currentPage === p ? style.selectedPage : style.otherPage}
                        onClick={() => props.onPageChanged(p)}>{p}</span>
                    })}
                </div>
            {
                props.users.map( u => <div key={u.id}>
                    <span>
                        <div>
                            <img src={ u.photos.small !== null ? u.photos.small : userPhoto } alt='userpic' className={style.userPhoto}/>
                        </div>
                        <div>
                            { u.followed 
                                        ? <button onClick={ () => { props.onFollow(u.id)}}>Unfollowed</button> 
                                        : <button onClick={ () => { props.onFollow(u.id)}}>Followed</button>}
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
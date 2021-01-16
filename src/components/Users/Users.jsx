import React from 'react'
import style from './Users.module.css'

const Users = (props) => {

    if (props.users.length === 0) {
        props.setUsers([{ id: 1, photoUrl: 'https://avatarfiles.alphacoders.com/715/71560.jpg', followed: false, fullname: 'David', status: 'bl', location: {city: 'Moscow', country: 'Russia' }},
        { id: 2, photoUrl: 'https://avatarfiles.alphacoders.com/715/71560.jpg', followed: true, fullname: 'Mathew', status: 'ga', location: {city: 'Kiev', country: 'Ukraine' }},
        { id: 3, photoUrl: 'https://avatarfiles.alphacoders.com/715/71560.jpg', followed: false, fullname: 'John', status: 'fu', location: {city: 'New-York', country: 'USA' }},])
    }

    return <div>
        {
            props.users.map( u => <div key={u.id}>
                <span>
                    <div>
                        <img src={u.photoUrl} alt='userpic' className={style.userPhoto}/>
                    </div>
                    <div>
                        { u.followed 
                                    ? <button onClick={ () => { props.follow(u.id)}}>Unfollowed</button> 
                                    : <button onClick={ () => { props.follow(u.id)}}>Followed</button>}
                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.fullname}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{u.location.country}</div>
                        <div>{u.location.city}</div>
                    </span>
                </span>
            </div>)
        }
    </div>
}

export default Users
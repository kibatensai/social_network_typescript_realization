import * as axios from 'axios'
import React, { Component } from 'react'
import style from './Users.module.css'
import userPhoto from '../../assets/images/usermockpng.png'

class Users extends Component {

    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/users')
        .then(response => {
            this.props.setUsers(response.data.items)
        })
    }


    render() { 

        return <div>
        {
            this.props.users.map( u => <div key={u.id}>
                <span>
                    <div>
                        <img src={ u.photos.small !== null ? u.photos.small : userPhoto } alt='userpic' className={style.userPhoto}/>
                    </div>
                    <div>
                        { u.followed 
                                    ? <button onClick={ () => { this.props.follow(u.id)}}>Unfollowed</button> 
                                    : <button onClick={ () => { this.props.follow(u.id)}}>Followed</button>}
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
    }
}

export default Users
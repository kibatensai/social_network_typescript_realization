import React from 'react'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import './Profile.css'
import ProfileInfo from './ProfileInfo/ProfileInfo'

const Profile = ( { store } ) => {
  return (
    <div>
      <ProfileInfo />
      <MyPostsContainer store={store} />
    </div>

  )
}

export default Profile
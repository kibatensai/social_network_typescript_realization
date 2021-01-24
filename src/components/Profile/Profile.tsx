import React from 'react'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import './Profile.css'
import ProfileInfo from './ProfileInfo/ProfileInfo'

const Profile = () => {
  return (
    <div>
      <ProfileInfo />
      <MyPostsContainer  />
    </div>

  )
}

export default Profile
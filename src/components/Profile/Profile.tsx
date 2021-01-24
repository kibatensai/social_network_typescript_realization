import React from 'react'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import './Profile.css'
import ProfileInfo from './ProfileInfo/ProfileInfo'

type ProfilePropsType = {
  profile: any
}

const Profile = ({ profile }: ProfilePropsType) => {
  return (
    <div>
      <ProfileInfo profile={profile}/>
      <MyPostsContainer  />
    </div>

  )
}

export default Profile
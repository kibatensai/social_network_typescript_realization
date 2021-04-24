import React from 'react'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import './Profile.css'
import ProfileInfo from './ProfileInfo/ProfileInfo'

type ProfilePropsType = {
  isOwner: boolean
  profile: any
  status: string
  updateStatus: (status: string) => void
  savePhoto: (photo: any) => void
  saveProfile: (formData: any) => void
}

const Profile = (props: ProfilePropsType) => {
  return (
    <div>
      <ProfileInfo {...props}/>
      <MyPostsContainer  />
    </div>

  )
}

export default Profile
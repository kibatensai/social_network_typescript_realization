import React from 'react'
import { ProfileType } from '../../../types/types'
import { Preloader } from '../../common/Preloader/Preloader'
import './ProfileInfo.css'
import mockPhoto from '../../../assets/images/usermockpng.png'
import { ProfileStatus } from './ProfileStatus/ProfileStatus'

type ProfileInfoPropsType = {
  savePhoto: (photo: any) => void
  isOwner: boolean
  profile: ProfileType
  status: string
  updateStatus: (status: string) => void
}

const ProfileInfo = (props: ProfileInfoPropsType) => {

  if (!props.profile) {
    return <Preloader />
  }

  const onMainPhotoSelected = (e: any) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0])
    }
  }

  const profilePhoto = props.profile.photos.large || mockPhoto
  return (
    <div>
    <div className='description_block'>
      <img src={profilePhoto} alt='profilePhoto' />
        { props.isOwner && <input type={'file'} onChange={onMainPhotoSelected}/> }
        <ProfileStatus {...props}/>
      </div>
  </div>
  )
}

export default ProfileInfo
import React from 'react'
import { ProfileType } from '../../../types/types'
import { Preloader } from '../../common/Preloader/Preloader'
import './ProfileInfo.css'
import mockPhoto from '../../../assets/images/usermockpng.png'
import { ProfileStatus } from './ProfileStatus/ProfileStatus'

type ProfileInfoPropsType = {
  profile: ProfileType
  status: string
  updateStatus: (status: string) => void
}

const ProfileInfo = (props: ProfileInfoPropsType) => {

  if (!props.profile) {
    return <Preloader />
  }

  const profilePhoto = props.profile.photos.large ? props.profile.photos.large : mockPhoto
  return (
    <div>
    {/* <div className='img'>
      <img id='header_img' src='https://demo.select-themes.com/nouveau/wp-content/uploads/2014/04/title_black_and_white_03.jpg' alt='pic'></img>
    </div> */}
    <div className='description_block'>
      <img src={profilePhoto} alt='profilePhoto'/>
        <ProfileStatus {...props}/>
      </div>
  </div>
  )
}

export default ProfileInfo
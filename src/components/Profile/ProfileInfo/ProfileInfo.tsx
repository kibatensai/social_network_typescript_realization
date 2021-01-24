import React from 'react'
import { ProfileType } from '../../../types/types'
import { Preloader } from '../../common/Preloader/Preloader'
import './ProfileInfo.css'

type ProfileInfoPropsType = {
  profile: ProfileType
}

const ProfileInfo = ({ profile }: ProfileInfoPropsType) => {

  if (!profile) {
    return <Preloader />
  }

  return (
    <div>
    <div className='img'>
      <img id='header_img' src='https://demo.select-themes.com/nouveau/wp-content/uploads/2014/04/title_black_and_white_03.jpg' alt='pic'></img>
    </div>
    <div className='description_block'>
      <img src={profile.photos.large} />
      ava + description
      </div>
  </div>
  )
}

export default ProfileInfo
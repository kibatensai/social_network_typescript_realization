import React, { useState } from 'react'
import { ProfileType } from '../../../types/types'
import { Preloader } from '../../common/Preloader/Preloader'
import './ProfileInfo.css'
import mockPhoto from '../../../assets/images/usermockpng.png'
import { ProfileStatus } from './ProfileStatus/ProfileStatus'
import ProfileDataForm from './ProfileDataForm/ProfileDataForm'

type ProfileInfoPropsType = {
  savePhoto: (photo: any) => void
  isOwner: boolean
  profile: any
  status: string
  updateStatus: (status: string) => void
}

const ProfileInfo = (props: any) => {

  const [editMode, setEditMode] = useState(false)

  if (!props.profile) {
    return <Preloader />
  }

  const onMainPhotoSelected = (e: any) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0])
    }
  }

  const onSubmit = (formData: any) => {
    props.saveProfile(formData).then(() => {
      setEditMode(false)
    })
  }



  const profilePhoto = props.profile.photos.large || mockPhoto
  return (
    <div>
      <div className='description_block'>
        <img src={profilePhoto} alt='profilePhoto' />
        {props.isOwner && <input type={'file'} onChange={onMainPhotoSelected} />}

        {editMode
          ? <ProfileDataForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit}/>
          : <ProfileData profile={props.profile}
            isOwner={props.isOwner}
            goToEditMode={() => setEditMode(true)} />}


        <ProfileStatus {...props} />
      </div>
    </div>
  )
}

const ProfileData = ({ profile, isOwner, goToEditMode }: { profile: any, isOwner: boolean, goToEditMode: () => void }) => {
  return <div>
    {isOwner && <div><button onClick={goToEditMode}>edit</button></div>}
    <div>
      <b>Full Name</b>: {profile.fullName}
    </div>
    <div>
      <b>Looking for a Job</b>: {profile.lookingForAJob ? 'Yes' : 'No'}
    </div>
    {profile.lookingForAJob &&
      <div>
        <b>My professional skills</b>: {profile.lookingForAJobDescription}
      </div>
    }
    <div>
      <b>About me</b>: {profile.aboutMe}
    </div>
    <div>
      <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
        return <Contact key={key} contactTitle={key}
          contactValue={profile.contacts[key]}/>
      })}
    </div>
  </div>
}


const Contact = ({ contactTitle, contactValue }: { contactTitle: any, contactValue: any }) => {
  return <div className='contact'><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo
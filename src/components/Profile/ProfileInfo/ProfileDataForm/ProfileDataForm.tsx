import { FC } from "react"
import { reduxForm } from "redux-form"
import { createField, Input, Textarea } from '../../../common/FormsControls/FormsControls'
import './../ProfileInfo.css'
import style from '../../../common/FormsControls/FormsControls.module.css'

type ProfileDataFormType = {
  handleSubmit: () => void
  profile: any
  error: any
}

const ProfileDataForm: FC<ProfileDataFormType> = ({handleSubmit, profile, error}) => {

  return <form onSubmit={handleSubmit}>
    <div><button>save</button></div>
    {error && <div className={style.formSummaryError}>{error}</div>}
    <b>Full Name</b>: {createField('Full name', 'fullName', [], Input)}<br />
    <div>
      <b>Looking for a Job</b>: {createField('', 'lookingForAJob', [], Input, {type: 'checkbox'})}
    </div>

      <div>
        <b>My professional skills</b>:
        {createField('My professional skills', 'lookingForAJobDescription', [], Textarea)}
      </div>

    <div>
      <b>About me</b>:
      {createField('About me', 'aboutMe', [], Textarea)}
    </div>
    <div>
      <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
        return <div key={key} className='contact'>
          <b>{key}: {createField(key, 'contacts.' + key, [], Input)}</b>
        </div>
      })}
    </div>


  </form>
}

//@ts-ignore
const ProfileDataFormReduxForm = reduxForm<{}, Props>({ form: 'edit-profile' })(ProfileDataForm)

export default ProfileDataFormReduxForm
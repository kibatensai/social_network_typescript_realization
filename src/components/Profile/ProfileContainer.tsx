import { render } from '@testing-library/react'
import axios from 'axios'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AppStateType } from '../../redux/redux-store'
import { setUserProfile } from '../../redux/profile-reducer'
import Profile from './Profile'
import './Profile.css'
import { ProfileType } from '../../types/types'

type ProfileContainerType = {
    setUserProfile: (profile: any) => void
    profile: any
}

class ProfileContainer extends Component<ProfileContainerType> {

  componentDidMount() {
    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
      .then((response: any) => {
          this.props.setUserProfile(response.data)
  })
}

  render() {
      return (
        <div>
          <Profile { ...this.props } profile={this.props.profile} />
        </div>
      )
  }
}

const mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile
})

export default connect(mapStateToProps, { setUserProfile })(ProfileContainer)
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AppStateType } from '../../redux/redux-store'
import { getUserProfile } from '../../redux/profile-reducer'
import Profile from './Profile'
import './Profile.css'
import { RouteComponentProps, withRouter } from 'react-router-dom'

type ProfileContainerType = {
    getUserProfile: (userId: number) => void
    profile: any
} & RouteComponentProps<any>

class ProfileContainer extends Component<ProfileContainerType> {

  componentDidMount() {
    let userId = this.props.match.params.userId
    if(!userId) {userId = 2} 
    this.props.getUserProfile(userId)
  
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

const WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, { getUserProfile })(WithUrlDataContainerComponent)
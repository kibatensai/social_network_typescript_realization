import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AppStateType } from '../../redux/redux-store'
import { getUserProfile, getStatus, updateStatus } from '../../redux/profile-reducer'
import Profile from './Profile'
import './Profile.css'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { withAuthRedirect } from '../../hoc/WithAuthRedirect'
import { compose } from 'redux'

type ProfileContainerType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    profile: any
    status: string
    authorizedUserId: any
} & RouteComponentProps<any>

class ProfileContainer extends Component<ProfileContainerType> {

  componentDidMount() {
    let userId = this.props.match.params.userId
    if(!userId) {
      userId = this.props.authorizedUserId
      if(!userId) {
        this.props.history.push('/login')
      }
    
    } 
    this.props.getUserProfile(userId)
    this.props.getStatus(userId)
  
}

  render() {

      return (
        <div>
          <Profile { ...this.props } />
        </div>
      )
  }
}

const mapStateToProps = (state: AppStateType) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth

})

export default compose(
  connect(mapStateToProps, { getUserProfile, getStatus, updateStatus }),
  withRouter,
  withAuthRedirect
)(ProfileContainer)
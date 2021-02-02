import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AppStateType } from '../../redux/redux-store'
import Header from './Header'
import { getAuthUserData } from '../../redux/auth-reducer'

type HeaderContainerPropsType = {
   getAuthUserData: () => void
}

class HeaderContainer extends Component<HeaderContainerPropsType> {
   componentDidMount() {
      this.props.getAuthUserData()
   }

   render() {
      return (<Header {...this.props} />)
}
}

const mapStateToProps = (state: AppStateType) => ({
   isAuth: state.auth.isAuth,
   login: state.auth.login
})

export default connect(mapStateToProps, {getAuthUserData})(HeaderContainer)
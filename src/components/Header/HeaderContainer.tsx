import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AppStateType } from '../../redux/redux-store'
import Header from './Header'
import { logout } from '../../redux/auth-reducer'

class HeaderContainer extends Component {

   render() {
      return (<Header {...this.props} />)
}
}

const mapStateToProps = (state: AppStateType) => ({
   isAuth: state.auth.isAuth,
   login: state.auth.login
})

export default connect(mapStateToProps, {logout})(HeaderContainer)
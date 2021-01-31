import axios from 'axios'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AppStateType } from '../../redux/redux-store'
import Header from './Header'
import { setAuthUserData } from '../../redux/auth-reducer'

type HeaderContainerPropsType = {
   setAuthUserData: (id: number, email: string, login: string) => void
}

class HeaderContainer extends Component<HeaderContainerPropsType> {
   componentDidMount() {
      axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
         withCredentials: true
      })
        .then((response: any) => {
           if(response.data.resultCode === 0) {
              let { id, email, login } = response.data.data
              this.props.setAuthUserData(id, email, login)
           }
        })
   }

   render() {
      return (<Header {...this.props} />)
}
}

const mapStateToProps = (state: AppStateType) => ({
   isAuth: state.auth.isAuth,
   login: state.auth.login
})

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer)
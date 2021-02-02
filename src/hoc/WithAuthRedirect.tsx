import { ComponentType } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { AppStateType } from "../redux/redux-store"

const mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})

export const withAuthRedirect = <P extends object>(Component: ComponentType<P>) => {
    const RedirectComponent = (props: any) => {
        if (!props.isAuth) return <Redirect to='/login' />
        return <Component {...props} />
    }

    const ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)

    return ConnectedAuthRedirectComponent
}
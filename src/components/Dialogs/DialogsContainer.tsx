import React, { Dispatch } from 'react'
import './Dialogs.css'
import { sendMessageCreator } from '../../redux/dialogs-reducer'
import Dialogs from './Dialogs'
import { connect, ConnectedProps } from 'react-redux'
import { AppStateType } from '../../redux/redux-store'
import { withAuthRedirect } from '../../hoc/WithAuthRedirect'
import { compose } from 'redux'




let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage
 }
}
let mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        sendMessage: (newMessageBody: string) => {
            dispatch(sendMessageCreator(newMessageBody))
        }
    }
}

export type DialogsConnectorPropsType = ConnectedProps<typeof connector>

const connector = connect(
    mapStateToProps,
    mapDispatchToProps
)

export default compose(
    connector,
    withAuthRedirect
)(Dialogs)
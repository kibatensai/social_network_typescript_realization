import React, { Dispatch } from 'react'
import './Dialogs.css'
import { sendMessageCreator, updateNewMessageBodyCreator } from '../../redux/dialogs-reducer'
import Dialogs from './Dialogs'
import { connect, ConnectedProps } from 'react-redux'
import { AppStateType } from '../../redux/redux-store'




let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage
 }
}
let mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        updateNewMessageBody: (body: string) => {
            dispatch(updateNewMessageBodyCreator(body))
        },
        sendMessage: () => {
            dispatch(sendMessageCreator())
        }
    }
}

const connector = connect(
    mapStateToProps,
    mapDispatchToProps
)

export type DialogsConnectorPropsType = ConnectedProps<typeof connector>


const DialogsContainer = connector(Dialogs)

export default DialogsContainer
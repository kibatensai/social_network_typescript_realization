import React, { ChangeEvent } from 'react'
import './Dialogs.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import { DialogsConnectorPropsType } from './DialogsContainer'



const Dialogs = ({ dialogsPage, sendMessage, updateNewMessageBody }: DialogsConnectorPropsType) => {

    let dialogElements =
        dialogsPage.dialogData.map(i => <DialogItem key={i.id} name={i.name} id={i.id}/>)
    let messagesElements =
        dialogsPage.messageData.map(m => <Message key={m.id} message={m.message} id={m.id}/>)
    let newMessageBody = dialogsPage.newMessageBody

    let onSendMessageClick = () => {
        sendMessage()
    }

    let onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.target.value
        updateNewMessageBody(body)
    }

    return (
        <div className='dialogs'>
            <div className='dialogs-items'>
                {dialogElements}
            </div>
            <div className='messages'>
                {messagesElements}
            </div>
            <div><textarea value={newMessageBody}
                           onChange={onNewMessageChange}
                           placeholder='Enter your message'></textarea></div>
            <div><button onClick={onSendMessageClick}>send</button></div>
        </div>
    )
}

export default Dialogs
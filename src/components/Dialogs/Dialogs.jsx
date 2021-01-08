import React from 'react'
import './Dialogs.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'

const Dialogs = (props) => {

    let state = props.dialogsPage

    let dialogElements =
        state.dialogData.map(i => <DialogItem key={i.id} name={i.name} id={i.id}/>)
    let messagesElements =
        state.messageData.map(m => <Message key={m.id} message={m.message} id={m.id}/>)
    let newMessageBody = state.newMessageBody

    let onSendMessageClick = () => {
        props.sendMessage()
    }

    let onNewMessageChange = (e) => {
        let body = e.target.value
        props.updateNewMessageBody(body)
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
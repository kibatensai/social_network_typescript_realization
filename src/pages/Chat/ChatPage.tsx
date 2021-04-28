import React, { FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { ChatMessageType } from "../../api/chat-api";
import { sendMessage, startMessagesListening, stopMessagesListening } from "../../redux/chat-reducer";
import { AppStateType } from './../../redux/redux-store'




const ChatPage: FC = () => {
    const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)
    return (
        <>
            {isAuth
                ?
                <Chat />
                :
                <Redirect to={'/login'} />
            }
        </>
    )
}

const Chat: FC = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])


    return (
        <>
            <Messages />
            <AddMessageForm  />
        </>
    )
}

const Messages: FC<{  }> = ({  }) => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)

    const mappedMessages = messages.map((m, i) => <Message message={m} key={i} />)

    return (
        <div style={{ height: '400px', overflowY: 'auto' }}>
            {mappedMessages}
        </div>
    )
}


const Message: FC<{ message: ChatMessageType }> = ({ message }) => {
    return (
        <div>
            <img src={message.photo} alt='' style={{ width: '30px' }} /> <b>{message.userName}</b>
            <br />
            {message.message}
            <hr />
        </div>
    )
}


const AddMessageForm: FC<{ }> = () => {
    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')
    const dispatch = useDispatch()


    const sendMessageHandler = () => {
        if (!message) return
        dispatch(sendMessage(message))
        setMessage('')
    }
    return (
        <>
            <div>
                <textarea value={message} onChange={(e) => setMessage(e.currentTarget.value)}></textarea>
            </div>
            <div>
                <button disabled={false} onClick={sendMessageHandler}>send</button>
            </div>
        </>
    )
}

export default ChatPage
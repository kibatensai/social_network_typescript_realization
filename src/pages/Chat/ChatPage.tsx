import React, { FC, useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { AppStateType } from './../../redux/redux-store'

const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

export type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}

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
    return (
        <>
            <Messages />
            <AddMessageForm />
        </>
    )
}

const Messages: FC = () => {

    const [messages, setMessages] =useState<ChatMessageType[]>([])

    useEffect(() => {
        ws.addEventListener('message', (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        })
        return () => {
            ws.removeEventListener('message', () => {})
        }
    }, [])

    const mappedMessages = messages.map((m, i) => <Message message={m} key={i} />)

    return (
        <div style={{height: '400px', overflowY: 'auto'}}>
            {mappedMessages}
        </div>
    )
}


const Message: FC<{message: ChatMessageType}> = ({message}) => {
    return (
        <div>
            <img src={message.photo} alt='' style={{width: '30px'}}/> <b>{message.userName}</b>
            <br/>
            {message.message}
           <hr />
        </div>
    )
}


const AddMessageForm: FC = () => {

    const [message, setMessage] = useState('')

    const sendMessage = () => {
        if(!message) return
        ws.send(message)
        setMessage('')
    }

    return (
        <>
        <div>
            <textarea value={message} onChange={(e) => setMessage(e.currentTarget.value)}></textarea>
        </div>
        <div>
            <button onClick={sendMessage}>send</button>
        </div>
        </>
    )
}

export default ChatPage
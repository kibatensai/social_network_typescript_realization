import React from 'react'
import './Message.css'

type MessageType = {
    id: number
    message: string
}

const Message = ({ message }: MessageType) => {
    return <div className="message">{message}</div>
}

export default Message
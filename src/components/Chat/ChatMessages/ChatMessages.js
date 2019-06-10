import React from 'react'
import './ChatMessages.css'
import ChatMessage from './ChatMessage/ChatMessage'

const ChatMessages = props => {
    let result = []

    let { messages, user } = props
    messages.forEach((message, index) => {
        result.push(
            <ChatMessage
                isMine={user.name === message.who.name}
                message={message}
                key={index}
            />
        )
    })

    return (
        <div className='chat-text-wrapper'>
            <div className='chat-messages-wrapper'>
                <div className='chat-messages-wrapper-scrollview'>{result}</div>
            </div>
        </div>
    )
}

export default ChatMessages

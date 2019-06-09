import React from 'react'
import './ChatMessages.css'
import ChatMessage from './ChatMessage/ChatMessage'

const ChatMessages = props => {
    let result = []

    //todo parse chat object
    // let { messages } = props.chat
    // let { nickname } = props.user
    // messages.forEach((message, index) => {
    //     result.push(
    //         <ChatMessage
    //             isMine={nickname === message.from}
    //             message={message}
    //             key={index}
    //         />
    //     )
    // })

    return (
        <div className='chat-text-wrapper'>
            <div className='chat-messages-wrapper'>
                <div className='chat-messages-wrapper-scrollview'>{result}</div>
            </div>
        </div>
    )
}

export default ChatMessages

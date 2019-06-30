import React, { useRef, useEffect } from 'react'
import './ChatMessages.css'
import ChatMessage from './ChatMessage/ChatMessage'

const ChatMessages = props => {
    const scrollView = useRef(null)

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

    useEffect(() => {
        console.log(scrollView.current.clientHeight)
        console.log(scrollView.current.scrollHeight)
        scrollView.current.scrollTo(0, scrollView.current.scrollHeight)
    })

    return (
        <div className='chat-text-wrapper'>
            <div className='chat-messages-wrapper'>
                <div
                    ref={scrollView}
                    className='chat-messages-wrapper-scrollview'
                >
                    {result}
                </div>
            </div>
        </div>
    )
}

export default ChatMessages

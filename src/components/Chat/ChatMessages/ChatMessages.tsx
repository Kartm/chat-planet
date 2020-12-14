import React, { useRef, useEffect } from 'react'
import './ChatMessages.css'
import ChatMessage from './ChatMessage/ChatMessage'
import { User } from '../../../models/User.interface'
import { ChatMessage as ChatMessageModel } from '../../../models/ChatMessage.interface'

type ChatMessagesProps = {
    user: User | null
    messages: ChatMessageModel[] | null
}

const ChatMessages = (props: ChatMessagesProps) => {
    const scrollView = useRef<HTMLDivElement>(null)

    let result: JSX.Element[] = []

    let { messages, user } = props

    if(user && messages) {
        messages.forEach((message, index) => {
            result.push(
                <ChatMessage
                    isMine={user!.name === message.who.name}
                    message={message}
                    key={index}
                />
            )
        })
    }

    useEffect(() => {
        if(scrollView.current) {
            scrollView.current.scrollTo(0, scrollView.current.scrollHeight)
        }
    })

    return (
        <div className="chat-text-wrapper">
            <div className="chat-messages-wrapper">
                <div
                    ref={scrollView}
                    className="chat-messages-wrapper-scrollview"
                >
                    {result}
                </div>
            </div>
        </div>
    )
}

export default ChatMessages

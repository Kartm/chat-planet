import React, { Component } from 'react'
import './Chat.css'
import ChatHeader from './ChatHeader/ChatHeader'
import ChatMessages from './ChatMessages/ChatMessages'
import ChatInput from './ChatInput/ChatInput'
import { CHAT_MESSAGE } from '../../Server/Events'

class Chat extends Component {
    state = {
        messages: this.props.chat.messages
    }

    getPartner = ({ user, users }) => {
        let result = Object.values(users).filter(arrUser => {
            if (arrUser.chatroomId === user.chatroomId) {
                if (arrUser.id !== user.id) return true
                return false
            }
            return false
        })
        return result.pop()
    }

    onSend = ({ value }) => {
        const { socket } = this.props
        let message = {}
        message.who = this.props.user
        message.content = value
        this.props.onMessageSend({ message })
        socket.emit(CHAT_MESSAGE, { message })
    }

    render() {
        const { chat, user, users, onChatLeave } = this.props
        return (
            <div className='chat'>
                <ChatHeader
                    onChatLeave={onChatLeave}
                    partner={this.getPartner({ user, users })}
                />
                <ChatMessages user={user} messages={chat.messages} />
                <ChatInput onSend={this.onSend} />
            </div>
        )
    }
}

export default Chat

import React, { Component } from 'react'
import './Chat.css'
import ChatHeader from './ChatHeader/ChatHeader'
import ChatMessages from './ChatMessages/ChatMessages'
import ChatInput from './ChatInput/ChatInput'

class Chat extends Component {
    render() {
        const { chat } = this.props
        return (
            <div className='chat'>
                <ChatHeader chat={chat} />
                <ChatMessages chat={chat} />
                <ChatInput />
            </div>
        )
    }
}

export default Chat

import React, { Component } from 'react'
import './Chat.css'
import Flag from '../Flag/Flag'
import ChatMessage from './ChatMessage/ChatMessage'

class Chat extends Component {
    renderMessages = () => {
        let result = []
        this.props.chat.messages.forEach((message, index) => {
            let isMine = this.props.user.nickname === message.from
            result.push(
                <ChatMessage isMine={isMine} message={message} key={index} />
            )
        })

        return result
    }

    render() {
        const { chat } = this.props
        const { nickname, countryName, countryCode } = chat.with
        return (
            <div className='chat'>
                <div className='chat-header-wrapper'>
                    <div className='chat-header-text'>
                        <span>{`${nickname}, ${countryName}`}</span>
                    </div>
                    <Flag countryCode={countryCode} />
                </div>
                <div className='chat-text-wrapper'>
                    <div className='chat-messages-wrapper'>
                        <div className='chat-messages-wrapper-scrollview'>
                            {this.renderMessages()}
                        </div>
                    </div>
                </div>
                <form className='chat-input'>
                    <textarea className='input input--sepia' />
                    <button className='button button--sepia'>Send</button>
                </form>
            </div>
        )
    }
}

export default Chat

import React from 'react'
import './ChatInput.css'

const ChatInput = props => {
    return (
        <form className='chat-input'>
            <textarea className='input input--sepia' />
            <button className='button button--sepia'>Send</button>
        </form>
    )
}

export default ChatInput

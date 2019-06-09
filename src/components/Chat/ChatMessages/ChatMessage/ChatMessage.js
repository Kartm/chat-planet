import React from 'react'
import './ChatMessage.css'

const ChatMessage = props => {
    let myStyle = props.isMine ? { backgroundColor: '#00000080' } : null
    return (
        <div className='message'>
            <span style={myStyle}>
                <b>{props.message.from}: </b>
                {props.message.content}
            </span>
        </div>
    )
}

export default ChatMessage

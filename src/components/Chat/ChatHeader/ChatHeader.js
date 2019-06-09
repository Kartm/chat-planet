import React from 'react'
import './ChatHeader.css'
import Flag from '../../reusable/Flag/Flag'

const ChatHeader = props => {
    return (
        <div className='chat-header-wrapper'>
            <div className='chat-header-text'>
                <span>nickname, countryname</span>
            </div>
            <Flag countryCode={'NZ'} />
        </div>
    )
}

export default ChatHeader

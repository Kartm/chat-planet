import React from 'react'
import './ChatHeader.css'
import Flag from '../../reusable/Flag/Flag'

const ChatHeader = props => {
    let { partner } = props
    console.log(partner)
    return (
        <div className='chat-header-wrapper'>
            <div className='chat-header-text'>
                <span>{`${partner.name}, ${partner.countryCode}`}</span>
            </div>
            <Flag countryCode={partner.countryCode} />
        </div>
    )
}

export default ChatHeader

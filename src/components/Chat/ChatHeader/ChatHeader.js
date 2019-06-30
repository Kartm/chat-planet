import React from 'react'
import './ChatHeader.css'
import Flag from '../../reusable/Flag/Flag'
import SepiaButton from '../../reusable/SepiaButton/SepiaButton'

const ChatHeader = props => {
    let { partner, onChatLeave } = props
    if (partner) {
        return (
            <div className='chat-header'>
                <div className='chat-header-text'>
                    <span>{`${partner.name}, ${partner.countryCode}`}</span>
                </div>
                <Flag countryCode={partner.countryCode} />
                <SepiaButton title={'Leave the chat'} onClick={onChatLeave}>
                    {String.fromCharCode(215)}
                </SepiaButton>
            </div>
        )
    } else return null
}

export default ChatHeader

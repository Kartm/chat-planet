import React from 'react'
import './Tab.css'
import Start from '../Start/Start'
import MapWrapper from '../MapWrapper/MapWrapper'
import Chat from '../Chat/Chat'
const { Tabs } = require('../App/Enums')

const Tab = props => {
    let element
    switch (props.tab) {
        case Tabs.START:
            element = (
                <Start
                    socket={props.socket}
                    setUsers={props.setUsers}
                    setUser={props.setUser}
                    setTab={props.setTab}
                />
            )
            break
        case Tabs.WORLDMAP:
            element = (
                <MapWrapper
                    user={props.user}
                    users={props.users}
                    sendInvitation={props.sendInvitation}
                />
            )
            break
        default:
            element = (
                <Chat
                    user={props.user}
                    users={props.users}
                    chat={props.chat}
                    socket={props.socket}
                    onMessageSend={props.onMessageSend}
                    onChatLeave={props.onChatLeave}
                />
            )
            break
    }
    return <div className='tab'>{element}</div>
}

export default Tab

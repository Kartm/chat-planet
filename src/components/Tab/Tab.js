import React from 'react'
import './Tab.css'
import Start from '../Start/Start'
import MapWrapper from '../MapWrapper/MapWrapper'
import Chat from '../Chat/Chat'

const Tab = props => {
    let element
    switch (props.tab) {
        case 1:
            element = (
                <Start
                    socket={props.socket}
                    setUsers={props.setUsers}
                    setUser={props.setUser}
                    setTab={props.setTab}
                />
            )
            break
        case 2:
            element = (
                <MapWrapper
                    user={props.user}
                    users={props.users}
                    sendInvitation={props.sendInvitation}
                />
            )
            break
        default:
            element = <Chat user={props.user} chat={props.chat} />
            break
    }
    return <div className='tab'>{element}</div>
}

export default Tab

import React from 'react'
import './Tab.css'
import Start from '../Start/Start'
import MapWrapper from '../MapWrapper/MapWrapper'
import Chat from '../Chat/Chat'

const Tab = props => {
    let element
    switch (props.tab) {
        case 1:
            element = <Start setUsers={props.setUsers} />
            break
        case 2:
            element = <MapWrapper />
            break
        default:
            element = <Chat user={props.user} chat={props.chat} />
            break
    }
    return <div className='tab'>{element}</div>
}

export default Tab

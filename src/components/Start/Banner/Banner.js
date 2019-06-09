import React from 'react'
import './Banner.css'
import Login from '../Login/Login'
import SepiaButton from '../../reusable/SepiaButton/SepiaButton'

const Banner = props => {
    let display = props.clickedJoin ? (
        <Login
            socket={props.socket}
            setUsers={props.setUsers}
            setUser={props.setUser}
            setTab={props.setTab}
        />
    ) : (
        <SepiaButton onClick={props.onClick}>JOIN</SepiaButton>
    )
    return (
        <div className='start-banner'>
            <div className='start-banner bg' />
            {display}
        </div>
    )
}

export default Banner

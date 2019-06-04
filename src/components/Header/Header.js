import React from 'react'
import OnlineBadge from './OnlineBadge/OnlineBadge'
import Navbar from '../Navbar/Navbar'
import './Header.css'

const Header = props => {
    const amount = Object.keys(props.users).length
    return (
        <div className='header'>
            <div className='headerText small-shadow'>Chat Planet</div>
            <OnlineBadge amount={amount} />
            <Navbar
                isLoggedIn={props.isLoggedIn}
                isChatActive={props.isChatActive}
                onTabChange={props.onTabChange}
            />
        </div>
    )
}

export default Header

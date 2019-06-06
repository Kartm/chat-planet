import React from 'react'
import OnlineBadge from './OnlineBadge/OnlineBadge'
import Navbar from '../Navbar/Navbar'
import './Header.css'
import Flag from '../reusable/Flag/Flag'

const Header = props => {
    const amount = Object.keys(props.users).length
    return (
        <div className='header'>
            <div className='header-text'>Chat Planet</div>
            <OnlineBadge amount={amount} />
            <Navbar
                isLoggedIn={props.isLoggedIn}
                isChatActive={props.isChatActive}
                activeTab={props.activeTab}
                setTab={props.setTab}
            />
            {props.user && (
                <div className='header-user'>
                    <Flag countryCode={props.user.countryCode} />
                    <span>{props.user.name}</span>
                </div>
            )}
        </div>
    )
}

export default Header

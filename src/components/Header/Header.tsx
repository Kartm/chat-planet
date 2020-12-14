import React from 'react'
import OnlineBadge from './OnlineBadge/OnlineBadge'
import Navbar from '../Navbar/Navbar'
import './Header.css'
import Flag from '../reusable/Flag/Flag'
import { User, Users } from '../../models/User.interface'
import { Tabs } from '../../models/Tabs.enum'

type HeaderProps = {
    user: User | null;
    users: Users | null;
    isLoggedIn: boolean;
    isChatActive: boolean;
    activeTab: Tabs;
    setTab: (tab: Tabs) => void;
}

const Header = (props: HeaderProps) => {

    if(props.users) {
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

    return null;
    
}

export default Header

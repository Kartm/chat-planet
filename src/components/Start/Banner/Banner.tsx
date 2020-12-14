import React from 'react'
import './Banner.css'
import Login from '../Login/Login'
import SepiaButton from '../../reusable/SepiaButton/SepiaButton'
import { Socket } from 'socket.io'
import { User, Users } from '../../../models/User.interface'
import { Tabs } from '../../../models/Tabs.enum'

type BannerProps = {
    clickedJoin: boolean;
    socket: Socket | null;
    setUsers: (users: Users) => void;
    setTab: (tab: Tabs) => void;
    setUser: (user: User) => void;
    onClick: () => void;
}

const Banner = (props: BannerProps) => {
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

import React, { Component } from 'react'
import { Socket } from 'socket.io'
import { Tabs } from '../../models/Tabs.enum'
import { User, Users } from '../../models/User.interface'
import Banner from './Banner/Banner'
import Description from './Description/Description'

type StartProps = {
    socket: Socket | null;
    setUsers: (users: Users) => void;
    setTab: (tab: Tabs) => void;
    setUser: (user: User) => void;
}

class Start extends Component<StartProps> {
    state = { clickedJoin: false }
    render() {
        return (
            <React.Fragment>
                <Banner
                    socket={this.props.socket}
                    clickedJoin={this.state.clickedJoin}
                    setUsers={this.props.setUsers}
                    setUser={this.props.setUser}
                    setTab={this.props.setTab}
                    onClick={() => {
                        this.setState({ clickedJoin: true })
                    }}
                />
                <Description />
            </React.Fragment>
        )
    }
}

export default Start

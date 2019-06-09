import React, { Component } from 'react'
import './App.css'
import './reset.css'
import { Tabs } from './Enums'
import Header from '../Header/Header'
import Tab from '../Tab/Tab'
import InvitationModal from '../InvitationModal/InvitationModal'

import io from 'socket.io-client'
import {
    REFRESH_USERS,
    INVITATION_GOT,
    INVITATION_SENT
} from '../../Server/Events'
import Invitation from './Invitation'
const socketUrl = 'http://localhost:3231'

class App extends Component {
    state = {
        user: null,
        users: [],
        socket: null,
        invitation: null,
        tab: Tabs.START,
        chat: {
            with: {
                name: 'Dezan',
                countryCode: 'PL'
            },
            messages: [
                { timestamp: 1558252685000, from: 'Arach', content: 'test' }
            ]
        }
    }

    componentDidMount() {
        const socket = io.connect(socketUrl)
        this.setState({ socket })
        socket.on('connect', () => {
            console.log('Connected to server.')
        })

        socket.on(REFRESH_USERS, ({ users }) => {
            this.setUsers(users)
        })

        socket.on(INVITATION_GOT, ({ invitation }) => {
            this.onInvitationReceive({ invitation })
        })
    }

    setUser = user => {
        this.setState({ user })
    }

    setUsers = users => {
        this.setState({ users })
    }

    setTab = tab => {
        this.setState({ tab })
    }

    onInvitationReceive = ({ invitation }) => {
        console.log(invitation)
    }

    onInvitationAccept = ({ invitation }) => {
        console.log(invitation)
    }

    onInvitationReject = () => {
        this.setState({ invitation: null })
    }

    sendInvitation = ({ from, to }) => {
        const { socket } = this.state
        const invitation = new Invitation({
            from,
            to
        })
        socket.emit(INVITATION_SENT, { invitation })
    }

    render() {
        return (
            <React.Fragment>
                <InvitationModal
                    invitation={this.state.invitation}
                    onAccept={this.onInvitationAccept}
                    onReject={this.onInvitationReject}
                />
                <Header
                    setTab={this.setTab}
                    activeTab={this.state.tab}
                    onLogin={this.onLogin}
                    user={this.state.user}
                    users={this.state.users}
                    isLoggedIn={this.state.user !== null}
                    isChatActive={this.state.chat !== null}
                />
                <Tab
                    socket={this.state.socket}
                    setUsers={this.setUsers}
                    setUser={this.setUser}
                    setTab={this.setTab}
                    sendInvitation={this.sendInvitation}
                    user={this.state.user}
                    users={this.state.users}
                    chat={this.state.chat}
                    tab={this.state.tab}
                />
            </React.Fragment>
        )
    }
}

export default App

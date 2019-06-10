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
    INVITATION_SENT,
    INVITATION_ACCEPT,
    CHATROOM_CREATE
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
        chat: null
    }

    componentDidMount() {
        const socket = io.connect(socketUrl)
        this.setState({ socket })
        socket.on('connect', () => {
            console.log('Connected to server.')
        })

        socket.on(REFRESH_USERS, ({ users }) => {
            this.setUsers(users)
            let { user } = this.state
            if (user) {
                let newUser = users[user.id]
                this.setState({ user: newUser })
            }
        })

        socket.on(INVITATION_GOT, ({ invitation }) => {
            this.onInvitationReceive({ invitation })
        })

        socket.on(CHATROOM_CREATE, ({ chat }) => {
            this.setState({ chat }, () => {
                this.setTab(Tabs.CHAT)
            })
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
        this.setState({ invitation })
    }

    onInvitationAccept = () => {
        const { socket, invitation } = this.state
        socket.emit(INVITATION_ACCEPT, { invitation })
    }

    onInvitationClose = () => {
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
                    onClose={this.onInvitationClose}
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
                    chat={this.state.chat}
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

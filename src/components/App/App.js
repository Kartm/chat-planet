import React, { Component } from 'react'
import './App.css'
import './reset.css'
import './responsive.css'
import { Tabs } from './Enums'
import Header from '../Header/Header'
import Tab from '../Tab/Tab'
import InvitationModal from '../InvitationModal/InvitationModal'
import InformationModal from '../InformationModal/InformationModal'

import io from 'socket.io-client'
import {
    REFRESH_USERS,
    INVITATION_GOT,
    INVITATION_SENT,
    INVITATION_ACCEPT,
    CHATROOM_CREATE,
    CHAT_MESSAGE,
    CHAT_LEAVE
} from '../../Server/Events'
import Invitation from './Invitation'

let socketUrl = 'wss://' + window.location.hostname
if (process.env.NODE_ENV === 'development') {
    socketUrl = 'http://localhost:3231'
}

class App extends Component {
    state = {
        user: null,
        users: [],
        socket: null,
        invitation: null,
        information: null,
        tab: Tabs.START,
        chat: null
    }

    componentDidMount() {
        const socket = io.connect(socketUrl, { secure: true })
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
            this.setState({ invitation })
        })

        socket.on(CHATROOM_CREATE, ({ chat }) => {
            this.setState({ chat }, () => {
                this.setTab(Tabs.CHAT)
            })
        })

        socket.on(CHAT_MESSAGE, ({ message }) => {
            this.addNewMessage({ message })
        })

        socket.on(CHAT_LEAVE, () => {
            this.setTab(Tabs.WORLDMAP)
            this.setState({ chat: null })
            this.setState({ information: 'Your chat has ended.' })
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

    onInvitationAccept = () => {
        const { socket, invitation } = this.state
        socket.emit(INVITATION_ACCEPT, { invitation })
    }

    onInvitationClose = () => {
        this.setState({ invitation: null })
    }

    onInformationClose = () => {
        this.setState({ information: null })
    }

    sendInvitation = ({ from, to }) => {
        const { socket } = this.state
        const invitation = new Invitation({
            from,
            to
        })
        socket.emit(INVITATION_SENT, { invitation })
    }

    addNewMessage = ({ message }) => {
        this.setState({
            chat: {
                ...this.state.chat,
                messages: [...this.state.chat.messages, message]
            }
        })
    }

    onChatLeave = () => {
        const { socket } = this.state
        socket.emit(CHAT_LEAVE, null)
    }

    render() {
        return (
            <React.Fragment>
                <InvitationModal
                    invitation={this.state.invitation}
                    onAccept={this.onInvitationAccept}
                    onClose={this.onInvitationClose}
                />
                <InformationModal
                    information={this.state.information}
                    onClose={this.onInformationClose}
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
                    tab={this.state.tab}
                    onMessageSend={this.addNewMessage}
                    onChatLeave={this.onChatLeave}
                />
            </React.Fragment>
        )
    }
}

export default App

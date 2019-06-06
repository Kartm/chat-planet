import React, { Component } from 'react'
import './App.css'
import './reset.css'
import { Tabs } from './Enums'
import Header from '../Header/Header'
import Tab from '../Tab/Tab'

import io from 'socket.io-client'
import { REFRESH_USERS } from '../../Server/Events'
const socketUrl = 'http://localhost:3231'

class App extends Component {
    state = {
        user: null,
        users: [],
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

        socket.on('connect', () => {
            console.log('Connected to server.')
            socket.on(REFRESH_USERS, ({ users }) => {
                this.setUsers(users)
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

    render() {
        return (
            <React.Fragment>
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
                    setUsers={this.setUsers}
                    setUser={this.setUser}
                    setTab={this.setTab}
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

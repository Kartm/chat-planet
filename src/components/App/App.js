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
        //user: null,
        user: {
            nickname: 'Arach',
            countryCode: 'PL'
        },
        users: [],
        tab: Tabs.START, //1 - world map, 2 - about, 3 - chat
        chat: {
            with: {
                nickname: 'Dezan',
                countryCode: 'PL',
                countryName: 'Poland'
            },
            messages: [
                { timestamp: 1558252685000, from: 'Arach', content: 'test' },
                { timestamp: 1558252685000, from: 'Arach', content: 'test' },
                { timestamp: 1558252685000, from: 'Dezan', content: 'test' },
                { timestamp: 1558252685000, from: 'Arach', content: 'test' },
                { timestamp: 1558252685000, from: 'Arach', content: 'test' },
                { timestamp: 1558252685000, from: 'Arach', content: 'test' },
                { timestamp: 1558252685000, from: 'Dezan', content: 'test' },
                { timestamp: 1558252685000, from: 'Dezan', content: 'test' },
                { timestamp: 1558252685000, from: 'Dezan', content: 'test' },
                { timestamp: 1558252685000, from: 'Arach', content: 'test' },
                { timestamp: 1558252685000, from: 'Arach', content: 'test' },
                { timestamp: 1558252685000, from: 'Arach', content: 'test' },
                { timestamp: 1558252685000, from: 'Dezan', content: 'test' },
                { timestamp: 1558252685000, from: 'Dezan', content: 'test' },
                { timestamp: 1558252685000, from: 'Arach', content: 'test' },
                { timestamp: 1558252685000, from: 'Arach', content: 'test' },
                { timestamp: 1558252685000, from: 'Arach', content: 'test' },
                { timestamp: 1558252685000, from: 'Arach', content: 'test' },
                { timestamp: 1558252685000, from: 'Dezan', content: 'test' },
                { timestamp: 1558252685000, from: 'Dezan', content: 'test' },
                { timestamp: 1558252685000, from: 'Dezan', content: 'test' },
                { timestamp: 1558252685000, from: 'Arach', content: 'test' },
                { timestamp: 1558252685000, from: 'Arach', content: 'test' },
                { timestamp: 1558252685000, from: 'Arach', content: 'test' },
                { timestamp: 1558252685000, from: 'Arach', content: 'test' },
                { timestamp: 1558252685000, from: 'Arach', content: 'test' }
            ]
        }
    }

    componentDidMount() {
        const socket = io.connect(socketUrl)

        socket.on('connect', () => {
            console.log('Connected to server.')
            socket.on(REFRESH_USERS, ({ users }) => {
                console.log(users)
                this.setUsers(users)
            })
        })
    }

    onTabChange = id => {
        this.setState({ tab: id })
    }

    onLogin = ({ username, location }) => {
        this.setState({ location: location })
    }

    setUsers = users => {
        this.setState({ users })
    }

    render() {
        return (
            <React.Fragment>
                <Header
                    onTabChange={this.onTabChange}
                    onLogin={this.onLogin}
                    users={this.state.users}
                    isLoggedIn={this.state.user !== null}
                    isChatActive={this.state.chat !== null}
                />
                <Tab
                    setUsers={this.setUsers}
                    user={this.state.user}
                    chat={this.state.chat}
                    tab={this.state.tab}
                />
            </React.Fragment>
        )
    }
}

export default App

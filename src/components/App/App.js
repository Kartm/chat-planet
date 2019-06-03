import React, { Component } from 'react'
import './App.css'
import './reset.css'
import { Tabs } from './Enums'
import Header from '../Header/Header'
import Tab from '../Tab/Tab'

import { LOGIN_RESPONSE } from '../../Server/Events'
import io from 'socket.io-client'
const socket = io('http://localhost:3231')

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
        console.log(socket)
        socket.on('connect', () => {
            console.log('Connected to server.')
        })
        socket.on(LOGIN_RESPONSE, data => {
            console.log(data)
        })
    }

    onTabChange = id => {
        this.setState({ tab: id })
    }

    onLogin = ({ username, location }) => {
        this.setState({ location: location })
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
                    user={this.state.user}
                    chat={this.state.chat}
                    tab={this.state.tab}
                />
            </React.Fragment>
        )
    }
}

export default App

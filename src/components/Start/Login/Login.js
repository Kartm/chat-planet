import React, { Component } from 'react'
import './Login.css'
import Flag from '../../reusable/Flag/Flag'
import SepiaInput from '../../reusable/SepiaInput/SepiaInput'
import SepiaButton from '../../reusable/SepiaButton/SepiaButton'
import { LOGIN_ATTEMPT, LOGIN_RESPONSE } from '../../../Server/Events'
import { Tabs } from '../../App/Enums'

import io from 'socket.io-client'
const socket = io('http://localhost:3231')

class About extends Component {
    state = { name: null, loginError: String.fromCharCode(160) }

    onInputChange = value => {
        this.setState({ name: value })
    }

    verifyLogin = () => {
        const { name } = this.state
        if (name === null) {
            this.setState({
                loginError: 'Your name cannot be empty.'
            })
            return false
        } else if (name.length < 3) {
            this.setState({
                loginError:
                    'Your name is too short. The minimum is 3 characters.'
            })
            return false
        } else if (name.length > 32) {
            this.setState({
                loginError:
                    'Your name is too long. The maximum is 32 characters.'
            })
            return false
        }
        this.setState({
            loginError: String.fromCharCode(160)
        })
        return true
    }

    onLoginAttempt = () => {
        if (this.verifyLogin()) {
            const data = {
                name: this.state.name
            }

            socket.emit(LOGIN_ATTEMPT, data)
        }
    }

    componentDidMount() {
        socket.on(LOGIN_RESPONSE, ({ response }) => {
            if (response.error === null) {
                console.log(response.users)
                //this.props.setUsers(response.users)
                this.props.setTab(Tabs.WORLDMAP)
                this.props.setUser(response.user)
                console.log(response.user)
            } else {
                this.setState({
                    loginError: response.error
                })
            }
        })
    }

    render() {
        return (
            <div className='login'>
                <form>
                    <p>Your name:</p>
                    <SepiaInput onInputChange={this.onInputChange} />
                    <p className='login-error'>{this.state.loginError}</p>
                    <SepiaButton onClick={() => this.onLoginAttempt()}>
                        LOGIN
                    </SepiaButton>
                </form>
            </div>
        )
    }
}

export default About

import React, { Component } from 'react'
import './Login.css'
import Flag from '../../reusable/Flag/Flag'
import SepiaInput from '../../reusable/SepiaInput/SepiaInput'
import SepiaButton from '../../reusable/SepiaButton/SepiaButton'
import { LOGIN_ATTEMPT, LOGIN_RESPONSE } from '../../../Server/Events'

import io from 'socket.io-client'
const socket = io('http://localhost:3231')

class About extends Component {
    state = { nickname: null, loginError: String.fromCharCode(160) }

    onInputChange = value => {
        this.setState({ nickname: value })
    }

    verifyLogin = () => {
        const { nickname } = this.state
        if (nickname === null) {
            this.setState({
                loginError: 'Your nickname cannot be empty.'
            })
            return false
        } else if (nickname.length < 3) {
            this.setState({
                loginError:
                    'Your nickname is too short. The minimum is 3 characters.'
            })
            return false
        } else if (nickname.length > 32) {
            this.setState({
                loginError:
                    'Your nickname is too long. The maximum is 32 characters.'
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
                nickname: this.state.nickname,
                countryCode: 'PL'
            }

            socket.emit(LOGIN_ATTEMPT, data, ({ responseData }) => {
                console.log(responseData)
            })
        }
    }

    componentDidMount() {
        //todo inspect this, not working
        socket.on(LOGIN_RESPONSE, () => {
            console.log('GOT RESPONSE')
        })
    }

    render() {
        return (
            <div className='login'>
                <form>
                    <p className='login-country'>
                        Your country: <Flag countryCode={'PL'} />
                        <b>Poland</b>
                    </p>
                    <p>Your nickname:</p>
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

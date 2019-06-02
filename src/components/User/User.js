import React, { Component } from 'react'
import Flag from '../Flag/Flag'
import './User.css'

class User extends Component {
    nicknameInput = React.createRef()

    state = {
        countryCode: 'US',
        countryName: null,
        nickname: null,
        loggedIn: false,
        consoleText: null
    }

    isNicknameValid = nickname => {
        if (nickname.length <= 0) return false
        return true
    }

    getCountry = e => {
        e.preventDefault()
        let tempNickname = this.nicknameInput.current.value
        if (this.isNicknameValid(tempNickname)) {
            let apiKey = '5ba35f485d4b8400896223f0e95bc87e'
            fetch(
                `http://api.ipstack.com/31.42.13.108?access_key=${apiKey}&format=1&language=en`
            )
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        throw new Error('Error while fetching the country')
                    }
                })
                .then(data => {
                    this.setState(
                        {
                            countryCode: data.country_code,
                            countryName: data.country_name,
                            nickname: tempNickname
                        },
                        this.setState({ loggedIn: true })
                    )
                    this.props.onLogin({
                        username: tempNickname,
                        location: data.country_code
                    })
                })
            return false
        } else {
            this.setState({
                consoleText: 'Invalid nickname. Minimum length is 1 character.'
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                {!this.state.loggedIn && (
                    <form className='login-form'>
                        <input
                            className='input input--sepia'
                            ref={this.nicknameInput}
                            type='text'
                            placeholder='Your nickname'
                        />
                        <button
                            style={{ alignSelf: 'center' }}
                            className='button button--sepia'
                            onClick={e => this.getCountry(e)}
                        >
                            Join!
                        </button>
                        <div className='login-info'>
                            <span>
                                By joining the game you're agreeing to our
                                <a
                                    className='login-info login-info--link'
                                    href='/'
                                >
                                    {' Terms & Conditions.'}
                                </a>
                            </span>
                        </div>
                        <div className='login-info login-info--console '>
                            {this.state.consoleText}
                        </div>
                    </form>
                )}
                {this.state.loggedIn && (
                    <div className='user'>
                        <div className='nickname'>{this.state.nickname}</div>
                        <Flag countryCode={this.state.countryCode} />
                        <div className='countryName'>
                            {this.state.countryName}
                        </div>
                    </div>
                )}
            </React.Fragment>
        )
    }
}

export default User

import React, { Component } from 'react'
import './Start.css'
import Login from './Login/Login'
import GithubLogo from '../../resources/graphics/github-logo.svg'

const Banner = props => {
    let display = props.clickedJoin ? (
        <Login />
    ) : (
        <button onClick={props.onClick}>JOIN</button>
    )
    return (
        <div className='start-banner'>
            <div className='start-banner bg' />
            {display}
        </div>
    )
}

const Description = props => {
    return (
        <div className='start-description'>
            <p>
                {'\t'}
                <b>Chat Planet</b> enables you to chat with foreigners from all
                around the world.
            </p>
            <div className='start-github'>
                <img
                    className='login-logo'
                    src={GithubLogo}
                    alt='Github logo.'
                />
                <a href='https://github.com/Kartm'>github.com/kartm</a>
            </div>
            <div className='start-footer'>© 2019 Łukasz Blachnicki</div>
        </div>
    )
}

class Start extends Component {
    state = { clickedJoin: false }
    render() {
        return (
            <React.Fragment>
                <Banner
                    clickedJoin={this.state.clickedJoin}
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

import React from 'react'
import './Description.css'
import GithubLogo from '../../../resources/graphics/github-logo.svg'

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
            <div className='start-footer'>
                © {new Date().getFullYear()} Łukasz Blachnicki
            </div>
        </div>
    )
}

export default Description

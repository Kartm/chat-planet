import React, { Component } from 'react'
import './Login.css'
import Flag from '../../Flag/Flag'

class About extends Component {
    render() {
        return (
            <div className='login'>
                <form>
                    <p className='login-country'>
                        Your country: <Flag countryCode={'PL'} />
                        <b>Poland</b>
                    </p>
                    <p>Your nickname:</p>
                    <input type='text' />
                    <button type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}

export default About

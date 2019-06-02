import React, { Component } from 'react'
import './Flag.css'

class Flag extends Component {
    render() {
        const { countryCode } = this.props
        return (
            <img
                className='flag'
                alt='Flag icon.'
                src={`https://www.countryflags.io/${countryCode}/flat/64.png`}
            />
        )
    }
}

export default Flag

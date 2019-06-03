import React from 'react'
import './SepiaButton.css'

const SepiaButton = props => {
    const onClick = e => {
        e.preventDefault()
        props.onClick()
    }

    return (
        <button onClick={onClick} type='submit' className='sepia-button'>
            {props.children}
        </button>
    )
}

export default SepiaButton

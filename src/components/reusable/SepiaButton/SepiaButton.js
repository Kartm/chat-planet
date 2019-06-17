import React from 'react'
import './SepiaButton.css'

const SepiaButton = props => {
    const onClick = e => {
        e.preventDefault()
        props.onClick()
    }

    let className = 'sepia-button '
    if (props.className) className += props.className

    return (
        <button
            title={props.title && props.title}
            onClick={onClick}
            type='submit'
            className={className}
        >
            {props.children}
        </button>
    )
}

export default SepiaButton

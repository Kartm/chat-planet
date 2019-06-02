import React from 'react'
import './NavbarItem.css'

const MenuItem = props => {
    let activeStyle = null
    if (props.isActive)
        activeStyle = { backgroundColor: '#d3c8b4', color: '#16181a' }
    return (
        <button
            className='navbar-item'
            onClick={props.onClick}
            style={activeStyle}
        >
            {props.text}
        </button>
    )
}

export default MenuItem

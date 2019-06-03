import React, { Component } from 'react'
import NavbarItem from './NavbarItem/NavbarItem'
import './Navbar.css'

class Navbar extends Component {
    state = { active: 1 }

    onClick = index => {
        this.setState({ active: index })
    }

    render() {
        return (
            <div className='sidebar'>
                <NavbarItem
                    onClick={() => {
                        this.props.onTabChange(1)
                        this.onClick(1)
                    }}
                    text='Start'
                    isActive={this.state.active === 1}
                    isDisabled={false}
                />
                <NavbarItem
                    onClick={() => {
                        this.props.onTabChange(2)
                        this.onClick(2)
                    }}
                    text='World map'
                    isActive={this.state.active === 2}
                    isDisabled={!this.props.isLoggedIn}
                />
                <NavbarItem
                    onClick={() => {
                        this.props.onTabChange(3)
                        this.onClick(3)
                    }}
                    text='Chat'
                    isActive={this.state.active === 3}
                    isDisabled={!this.props.isChatActive}
                />
            </div>
        )
    }
}

export default Navbar

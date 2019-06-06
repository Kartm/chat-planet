import React, { Component } from 'react'
import NavbarItem from './NavbarItem/NavbarItem'
import './Navbar.css'
import { Tabs } from '../App/Enums'

class Navbar extends Component {
    isActive = tab => {
        return tab === this.props.activeTab
    }

    render() {
        return (
            <div className='sidebar'>
                <NavbarItem
                    onClick={() => {
                        this.props.onTabChange(1)
                    }}
                    text='Start'
                    isActive={this.isActive(Tabs.START)}
                    isDisabled={false}
                />
                <NavbarItem
                    onClick={() => {
                        this.props.onTabChange(2)
                    }}
                    text='World map'
                    isActive={this.isActive(Tabs.WORLDMAP)}
                    isDisabled={!this.props.isLoggedIn}
                />
                <NavbarItem
                    onClick={() => {
                        this.props.onTabChange(3)
                    }}
                    text='Chat'
                    isActive={this.isActive(Tabs.CHAT)}
                    isDisabled={
                        !this.props.isChatActive || !this.props.isLoggedIn
                    }
                />
            </div>
        )
    }
}

export default Navbar

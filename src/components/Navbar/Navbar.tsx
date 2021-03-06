import React, { Component } from 'react';
import NavbarItem from './NavbarItem/NavbarItem';
import './Navbar.css';
import { Tabs } from '../../models/Tabs.enum';

type NavbarProps = {
  activeTab: Tabs;
  isLoggedIn: boolean;
  isChatActive: boolean;
  setTab: (tab: Tabs) => void;
};

class Navbar extends Component<NavbarProps> {
  isActive = (tab: Tabs) => {
    return tab === this.props.activeTab;
  };

  render() {
    return (
      <div className="sidebar">
        <NavbarItem
          onClick={() => this.props.setTab(Tabs.START)}
          text="Start"
          isActive={this.isActive(Tabs.START)}
          isDisabled={this.props.isLoggedIn}
        />
        <NavbarItem
          onClick={() => this.props.setTab(Tabs.WORLDMAP)}
          text="World map"
          isActive={this.isActive(Tabs.WORLDMAP)}
          isDisabled={!this.props.isLoggedIn}
        />
        <NavbarItem
          onClick={() => this.props.setTab(Tabs.CHAT)}
          text="Chat"
          isActive={this.isActive(Tabs.CHAT)}
          isDisabled={!this.props.isChatActive || !this.props.isLoggedIn}
        />
      </div>
    );
  }
}

export default Navbar;

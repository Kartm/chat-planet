import React, { Component } from 'react';
import Map from './map';
import About from './about';
import Chat from './chat';

class Content extends Component {
  getPanel = () => {
    switch (this.props.panel) {
      case 1:
        return <About />;
      case 2:
        return <Chat />;
      default:
        return <Map />;
    }
  };
  render() {
    return (
      <React.Fragment>
        <div className='content-wrapper'>{this.getPanel()}</div>
      </React.Fragment>
    );
  }
}

export default Content;

import React, { Component } from 'react';
import Placeholder from './placeholder.png';
import './Flag.css';

class Flag extends Component {
  state = {
    image: Placeholder,
  };
  componentDidMount() {
    const { countryCode } = this.props;
    let url = `https://cors-anywhere.herokuapp.com/https://www.countryflags.io/${countryCode}/flat/64.png`;
    fetch(url, { headers: {} })
      .then((response) => response.blob())
      .then((image) => {
        this.setState({
          image: URL.createObjectURL(image),
          loaded: true,
        });
      });
  }

  render() {
    return <img className="flag" alt="Flag icon." src={this.state.image} />;
  }
}

export default Flag;

import React, { Component } from 'react';
import logo from '../resources/graphics/map2.svg';
import MarkerIcon from '../resources/graphics/marker.png';

class Marker extends Component {
  //todo set size according to count!
  componentWillMount() {
    this.setState(
      {
        count: this.props.count
      },
      this.getPosition
    );
  }

  getPosition = () => {
    let windowWidth = document.documentElement.clientWidth;
    let windowHeight = document.documentElement.clientHeight;

    let y = (this.props.y / windowHeight) * 100;
    y = +y.toFixed(2);
    let x = (this.props.x / windowWidth) * 100;
    x = +x.toFixed(2);

    console.log(x, y);
    this.setState({
      top: `${y}vh`,
      left: `${x}vw`
    });
  };

  render() {
    return (
      <React.Fragment>
        <div style={{ top: this.state.top, left: this.state.left }} className='marker-wrapper'>
          <div className='marker'>
            <img className='marker-image' src={MarkerIcon} alt='Country pin.' />
            <div className='marker-number small-shadow'>{this.props.count}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

class Map extends Component {
  state = {
    index: 1,
    positions: [
      /*{ x: 0, y: 0, key: 0, count: 12 }*/
    ],
    biggestCount: 12
  };

  generateMarkers = () => {
    if (this.state.positions.length > 0)
      return this.state.positions.map(el => (
        <Marker key={el.key} x={el.x} y={el.y} count={el.count} biggestCount={this.state.biggestCount} />
      ));
  };

  testAddMarker = e => {
    let x = Math.round(e.clientX - e.target.getBoundingClientRect().left + window.scrollX);
    let y = Math.round(e.clientY - e.target.getBoundingClientRect().top + window.scrollY);
    let marker = { key: this.state.index, x: x, y: y, count: 12 };
    this.setState({ positions: [...this.state.positions, marker] });
    this.setState({ index: this.state.index + 1 });
  };

  render() {
    return (
      <React.Fragment>
        <div className='map-wrapper'>
          <img src={logo} className='map-img medium-shadow' alt='World map' />
          <div onClick={e => this.testAddMarker(e)} className='map-img-overlay'>
            {this.generateMarkers()}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Map;

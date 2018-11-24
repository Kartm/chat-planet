import React, { Component } from "react";
import logo from "../resources/graphics/map2.svg";
import MarkerIcon from "../resources/graphics/marker.png";

class Marker extends Component {
	//todo set size according to count!
	constructor(props) {
		super(props);
		this.state = {
			count: this.props.count,
			top: this.props.y,
			left: this.props.x
		};
	}

	adjustPin = e => {
		let height = e.target.offsetHeight;
		let width = e.target.offsetWidth;
		console.log(width, height);
		this.setState({
			top: this.state.top - height,
			left: this.state.left - width / 2
		});
	};

	render() {
		return (
			<React.Fragment>
				<div
					style={{ top: this.state.top, left: this.state.left }}
					className="marker-wrapper"
				>
					<img
						onLoad={e => this.adjustPin(e)}
						className="marker-image"
						src={MarkerIcon}
					/>
					<div className="marker-number">{this.props.count}</div>
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
				<Marker
					key={el.key}
					x={el.x}
					y={el.y}
					count={el.count}
					biggestCount={this.state.biggestCount}
				/>
			));
	};

	testAddMarker = e => {
		let x = Math.round(
			e.clientX - e.target.getBoundingClientRect().left + window.scrollX
		);
		let y = Math.round(
			e.clientY - e.target.getBoundingClientRect().top + window.scrollY
		);
		let marker = { key: this.state.index, x: x, y: y, count: 12 };
		this.setState({ positions: [...this.state.positions, marker] });
		this.setState({ index: this.state.index + 1 });
	};

	render() {
		return (
			<React.Fragment>
				<div className="map-wrapper">
					<img src={logo} className="map-img" alt="World map" />
					<div
						onClick={e => this.testAddMarker(e)}
						className="map-img-overlay"
					>
						{this.generateMarkers()}
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Map;

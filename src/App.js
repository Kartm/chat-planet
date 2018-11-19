import React, { Component } from "react";
import logo from "../resources/graphics/map.svg";
import "./App.css";

class App extends Component {
	render() {
		return (
			<div className="App">
				<img src={logo} className="map-img" alt="World map" />
			</div>
		);
	}
}

export default App;

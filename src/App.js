import React, { Component } from "react";
import "./App.css";
import OnlineBadge from "./components/online-badge";
import MenuItem from "./components/menu-item";
import Login from "./components/login";
import Map from "./components/map";

class App extends Component {
	render() {
		return (
			<div className="container">
				<div className="header">
					<div className="headerText">Chat Planet</div>
					<OnlineBadge />
				</div>
				<div className="content">
					<div className="menu-wrapper">
						<div className="menu-items">
							<Login />
							<MenuItem text="World map" />
							<MenuItem disabled={true} text="My profile" />
							<MenuItem text="About" />
						</div>
						<div className="menu-vertical-bar" />
					</div>
					<Map />
				</div>
			</div>
		);
	}
}

export default App;

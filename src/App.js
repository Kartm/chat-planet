import React, { Component } from "react";
import "./App.css";
import OnlineBadge from "./components/online-badge";
import MenuItem from "./components/menu-item";
import Content from "./components/content";

class App extends Component {
	state = {
		loggedIn: false
	};
	render() {
		return (
			<div className="container">
				<div className="header">
					<div className="headerText">Chat Planet</div>
					<OnlineBadge />
					<div className="header-menu-wrapper">
						<MenuItem text="World map" />
						<MenuItem
							disabled={this.state.loggedIn}
							text="My profile"
						/>
						<MenuItem text="About" />
					</div>
				</div>
				<div className="content">
					<Content panel={1} />
				</div>
			</div>
		);
	}
}

export default App;

import React, { Component } from "react";
import "./App.css";
import OnlineBadge from "./components/online-badge";
import MenuItem from "./components/menu-item";
import Login from "./components/login";
import Content from "./components/content";

class App extends Component {
	state = {
		panel: 2 //0 - world map, 1 - about, 2 - chat
	};

	changePanel = (e, id) => {
		if (id >= 0 && id <= 3) this.setState({ panel: id }); //! watch out here
	};

	loginEvent = (username, location) => {
		this.setState({ location: location });
	};

	render() {
		return (
			<div className="container">
				<div className="header">
					<div className="headerText small-shadow">Chat Planet</div>
					<OnlineBadge />
				</div>
				<div className="content">
					<div className="menu-wrapper">
						<div className="menu-items">
							<Login callback={this.loginEvent} />
							<MenuItem
								onClick={e => this.changePanel(e, 0)}
								text="World map"
							/>
							<MenuItem
								onClick={e => this.changePanel(e, 1)}
								text="About"
							/>
							<MenuItem
								onClick={e => this.changePanel(e, 2)}
								text="REMOVE THISSS"
							/>
						</div>
						<div className="menu-vertical-bar" />
					</div>
					<Content panel={this.state.panel} />
				</div>
			</div>
		);
	}
}

export default App;

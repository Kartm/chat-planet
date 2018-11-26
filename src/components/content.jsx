import React, { Component } from "react";
import Map from "./map";
import Login from "./login";

class Content extends Component {
	getPanel = () => {
		switch (this.props.panel) {
			case 0:
				return <Login />;
			case 1:
				return (
					<div className="content-wrapper">
						<Map />
					</div>
				);
		}
	};
	render() {
		return <React.Fragment>{this.getPanel()}</React.Fragment>;
	}
}

export default Content;

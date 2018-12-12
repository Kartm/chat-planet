import React, { Component } from "react";

class MenuItem extends Component {
	state = {};
	render() {
		return (
			<React.Fragment>
				<div
					className="menu-item small-shadow"
					onClick={this.props.onClick}
				>
					{this.props.text}
				</div>
			</React.Fragment>
		);
	}
}

export default MenuItem;

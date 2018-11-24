import React, { Component } from "react";

class MenuItem extends Component {
	state = {};
	render() {
		return (
			<React.Fragment>
				<div
					disabled={this.props.disabled}
					className="menu-item"
					onClick={this.props.onClick}
				>
					{this.props.text}
				</div>
			</React.Fragment>
		);
	}
}

export default MenuItem;

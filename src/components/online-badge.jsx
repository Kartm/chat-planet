import React, { Component } from "react";

class OnlineBadge extends Component {
	state = { onlineNow: 20 };
	render() {
		return (
			<React.Fragment>
				<div className="small-badge medium-shadow">
					<div className="small-badge-text">
						{this.state.onlineNow} online now!
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default OnlineBadge;

import React, { Component } from "react";

class Login extends Component {
	constructor(props) {
		super(props);
		this.nicknameInput = React.createRef();
	}

	state = {
		countryCode: "US",
		countryName: null,
		nickname: null,
		loggedIn: false
	}; //! should I use null here?

	getCountry = e => {
		e.preventDefault();
		console.log("test");
		fetch("https://geoip-db.com/json/")
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error("Error while fetching the country");
				}
			})
			.then(data =>
				this.setState(
					{
						countryCode: data.country_code,
						countryName: data.country_name,
						nickname: this.nicknameInput.current.value
					},
					this.setState({ loggedIn: true })
				)
			);
		return false;
	};

	render() {
		return (
			<React.Fragment>
				<div className="loginWrapper">
					{!this.state.loggedIn && (
						<div className="center-content">
							<form className="login-form">
								<input ref={this.nicknameInput} type="text" />
								<button
									style={{ alignSelf: "center" }}
									className="join-button"
									onClick={e => this.getCountry(e)}
								>
									Join the game!
								</button>
								<div className="small-text">
									By joining the game you're agreeing to our
									Terms & Conditions.
								</div>
							</form>
						</div>
					)}
					{this.state.loggedIn && (
						<div className="center-content">
							<div className="nickname">
								{this.state.nickname}
							</div>
							<img
								className="flagImg"
								src={`https://www.countryflags.io/${
									this.state.countryCode
								}/flat/64.png`}
							/>
							<div className="countryName">
								{this.state.countryName}
							</div>
						</div>
					)}
				</div>
			</React.Fragment>
		);
	}
}

export default Login;

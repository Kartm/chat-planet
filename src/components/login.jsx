import React, { Component } from "react";

class Login extends Component {
	constructor(props) {
		super(props);
		this.nicknameInput = React.createRef();
	}

	componentWillMount() {
		this.setState({
			countryCode: "US",
			countryName: null,
			nickname: null,
			loggedIn: false
		});
	}

	getCountry = e => {
		e.preventDefault();
		console.log("Fetching geo location...");
		let apiKey = "5ba35f485d4b8400896223f0e95bc87e";
		fetch(
			`http://api.ipstack.com/31.42.13.108?access_key=${apiKey}&format=1&language=en`
		)
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error("Error while fetching the country");
				}
			})
			.then(data => {
				console.log(data);
				this.setState(
					{
						countryCode: data.country_code,
						countryName: data.country_name,
						nickname: this.nicknameInput.current.value
					},
					this.setState({ loggedIn: true })
				);
			});
		return false;
	};

	render() {
		return (
			<React.Fragment>
				<div className="loginWrapper small-shadow">
					{!this.state.loggedIn && (
						<div className="center-content">
							<form className="login-form">
								<input
									id="nicknameInput"
									ref={this.nicknameInput}
									type="text"
								/>
								<button
									style={{ alignSelf: "center" }}
									className="join-button"
									onClick={e => this.getCountry(e)}
								>
									Join!
								</button>
								<div className="small-text">
									<span>
										By joining the game you're agreeing to
										our
										<a className="small-link" href="#">
											{" Terms & Conditions."}
										</a>
									</span>
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

import React, { Component } from "react";
import Logo from "../resources/graphics/vengel-logo.png";
import GithubLogo from "../resources/graphics/github-logo.svg";
import WebLogo from "../resources/graphics/web-logo.svg";

class About extends Component {
	render() {
		return (
			<div className="about small-shadow">
				<div className="about-header">About us</div>
				<div className="about-content">
					<img
						src={Logo}
						className="fill-image vengel-logo"
						alt="Vengel Studio logo."
					/>
					<React.Fragment>
						<p>
							We are a startup company run by two students from
							Poland who are interested in app development. Our
							point is to constantly enlarge our programming
							skills and learn new things.
						</p>
						<p>
							{"\t"}
							<b>Chat Planet</b> enables you to chat with
							foreigners from all around the world. It is our
							first project which utilizes external APIs on this
							level.
						</p>
						<div className="portfolio-wrapper">
							<div className="portfolio-website">
								<img
									className="about-logo"
									src={WebLogo}
									alt="Web logo."
								/>
								<a
									className="about-link"
									href="https://vengelstudio.com"
								>
									vengelstudio.com
								</a>
							</div>
							<div className="portfolio-github">
								<img
									className="about-logo"
									src={GithubLogo}
									alt="Github logo."
								/>
								<a
									className="about-link"
									href="https://github.com/vengelstudio"
								>
									github.com/vengelstudio
								</a>
							</div>
						</div>
					</React.Fragment>
				</div>
				<div className="about-footer">© 2018 Vengel Studio</div>
			</div>
		);
	}
}

export default About;

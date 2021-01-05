import React, { Component } from 'react';
import Intakes from '../layout/intakes';


export default class UserHome extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div>
				{this.props.user ? (
					<div className="container mt-8">
						<div className="row">
							<div className="col-lg-4 bg-dark text-center p-4 d-flex justify-content-center flex-column">
								<h3 className="font-weight-bold">
									Hi {this.props.user.firstname} {this.props.user.lastname}
								</h3>
								<p className="lead">Get ready to add projects & review teams</p>
							</div>
							<div className="col-lg-8 team-work">
								<img src="../../.././img/Team_Work.png" alt="Team Work" />
							</div>
						</div>
						<section id="project-categories-home" className="text-center py-5">
							<div className="container">
								<div className="row">
									<Intakes isLoggedIn={this.props.isLoggedIn} history={this.props.history} isAdmin={this.props.isAdmin} />
								</div>
							</div>
						</section>
					</div>
				) : null}
			</div>
		);
	}
}
import React from 'react';
import { Link } from 'react-router-dom';

function Showcase(props) {
	return (
		<section id="showcase">
			<div className="dark-overlay">
				<div className="showcase-inner container">
					<div className="row">
						<div className="col-lg-10">
							<h3 className="lead">Welcome to techedu</h3>
							<h1>The place where you can find projects with their teams</h1>

							<hr className="bottom-border bottom-border-primary d-inline-block" />
							{
								!props.loggedIn?
								<div className="row">
									<div className="col-md-4 mb-3">
										<Link to="/signin" className="btn btn-light btn-lg btn-block" data-toggle="modal" data-target="#signupModal">
											Sign In
										</Link>
									</div>
									<div className="col-md-4">
										<Link to="/signup" className="btn btn-outline-light btn-lg btn-block" data-toggle="modal" data-target="#signupModal">
											Sign Up
										</Link>
									</div>
								</div>: null
							}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Showcase;

import React from 'react';
import { Link } from 'react-router-dom';

function Success() {
	return (
		<React.Fragment>
			<div class="jumbotron text-center mt-5 ">
				<h1 class="display-4">Success!</h1>
				<p class="lead">You've been successfuly subscribed to our newsletter.</p>
				<Link class="btn btn-dark btn-lg" to="/" role="button">
					<i class="fas fa-home"></i> Back To Main
				</Link>
			</div>
		</React.Fragment>
	);
}

export default Success;

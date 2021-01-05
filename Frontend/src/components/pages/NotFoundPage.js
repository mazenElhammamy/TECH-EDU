import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
	return (
		<div class="jumbotron text-center mt-8">
			<div class="container">
				<h1 class="display-2">Ops!</h1>
				<h1 class="display-4">Error 404 Not Found</h1>
				<p>Sorry, an error occured. The requested Page was not found</p>
				<p>
					<Link class="btn btn-dark btn-lg" to="/" role="button">
						<i class="fas fa-home"></i> Back To Main
					</Link>
				</p>
			</div>
		</div>
	);
}

export default NotFoundPage;

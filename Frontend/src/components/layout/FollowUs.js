import React from 'react';

function FollowUs() {
	return (
		<section id="follow-us" className="text-center py-4 bg-primary">
			<div className="container">
				<h2>Follow Us</h2>
				<div className="mt-4">
					<a href="https://www.twitter.com" target="_blank" rel="noreferrer">
						<i className="m-4 fab fa-twitter fa-3x"></i>
					</a>
					<a href="https://www.facebook.com" target="_blank" rel="noreferrer">
						<i className="m-4 fab fa-facebook fa-3x"></i>
					</a>
					<a href="https://www.instagram.com" target="_blank" rel="noreferrer">
						<i className="m-4 fab fa-instagram fa-3x"></i>
					</a>
					<a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
						<i className="m-4 fab fa-linkedin fa-3x"></i>
					</a>
				</div>
			</div>
		</section>
	);
}

export default FollowUs;

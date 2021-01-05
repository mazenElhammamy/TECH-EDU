import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
	return (
		<React.Fragment>
			<footer id="footer" className="text-center">
				<div className="container py-4">
					<div className="row border-bottom">
						<div className="col-md-10 text-lg-left">
							<h4>
								<Link to="/" className="font-weight-bold text-uppercase">
									<span className="text-brand-secondary">Tech</span>
									<span className="text-brand-primary">Edu</span>
								</Link>
							</h4>
						</div>
						<div className="col-md-2 text-lg-right d-flex justify-content-around">
							<a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
								<i className="fab fa-facebook-f"></i>
							</a>
							<a href="https://www.twitter.com" target="_blank" rel="noreferrer">
								<i className="fab fa-twitter"></i>
							</a>
							<a href="https://www.instagram.com" target="_blank" rel="noreferrer">
								<i className="fab fa-instagram"></i>
							</a>
							<a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
								<i className="fab fa-linkedin-in"></i>
							</a>
						</div>
					</div>
					<h6 className="py-4">
						&copy; <span>{new Date().getFullYear()}</span> techedu.all right reserved
					</h6>
				</div>
			</footer>
		</React.Fragment>
	);
}

export default Footer;

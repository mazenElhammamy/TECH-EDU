import React, { Component } from 'react';

class Newsletter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
		};
	}

	handleSubmit = (e) => {
		e.preventDefault();

		if (this.state.email) {
			fetch(`/api/memberAdd?email=${this.state.email}`)
				.then((res) => res.json())
				.then(() => this.props.history.push('/Success'))
				.then((err) => console.log(err));
		}
	};

	handleChange = (e) => {
		this.setState({ email: e.target.value.trim() });
	};

	render() {
		return (
			<section id="news-letter" className="text-center py-4 bg-primary text-white">
				<div className="container">
					<h2 className="mb-4">Get Notified of new projects</h2>
					<form onSubmit={this.handleSubmit}>
						<div className="row">
							<div className="col-md-8 mb-2">
								<input
									type="email"
									name="email"
									placeholder="Enter Email.."
									className="form-control form-control-lg"
									onChange={this.handleChange}
									value={this.state.email}
								/>
							</div>
							<div className="col-md-4 mb-2">
								<button className="btn btn-dark btn-lg btn-block" type="submit">
									<i className="fas fa-envelope"></i> Subscribe
								</button>
							</div>
						</div>
					</form>

					<h6 className="mt-4 font-italic">Your Email Address will never be shared</h6>
				</div>
			</section>
		);
	}
}

export default Newsletter;

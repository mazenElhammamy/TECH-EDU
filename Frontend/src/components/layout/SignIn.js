import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class SignIn extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			emailError: '',
			passwordError: '',
			errorMessage:""
		};
	}
	validate = () => {
		let emailError = '';
		let passwordError = '';
		let mailformat = '[A-Z0-9a-z.-_]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,3}';
		let passwordformat = '(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}';

		if (!this.state.email.match(mailformat)) {
			emailError = 'Oops! Email is incorrect.';
		}
		if (!this.state.password.match(passwordformat)) {
			passwordError = 'Oops! Password is incorrect.';
		}

		if (emailError || passwordError) {
			this.setState({ emailError, passwordError });
			return false;
		}
		return true;
	};
	handleSubmit =  (e) => {
		e.preventDefault();
		const isValid = this.validate();
		if (isValid) {
			const obj = {
				email: this.state.email,
				password: this.state.password,
			};
		 axios.post('http://localhost:5000/api/user/login', obj)
		 .then((res) => {
			localStorage.setItem('token', res.data.token);
				this.props.setUser(res.data.user);
				this.props.history.replace('/userhome');
		})
		.catch((err) => {
			this.setState({
				errorMessage: err.response.data.status,
			});
		});
			
		}
	};

	handleChange = (e) => {
		let state = { ...this.state };
		state[e.currentTarget.name] = e.currentTarget.value;
		this.setState(state);
	};

	render() {
		return (
			<div className="container text-center mt-6">
				<div className="row">
					<div className="col-md-4 m-auto">
						<h1 className="modal-title w-100 font-weight-bold">
							<span className="text-brand-secondary">Tech</span>
							<span className="text-brand-primary">Edu</span>
						</h1>
						<hr className="bottom-border bottom-border-seconadry" />

						<span className="font-weight-bold d-block mb-2">Welcome Back</span>

						<form onSubmit={this.handleSubmit}>
							<div className="form-group">
								<input type="text" className="form-control" placeholder="Email" name="email" onChange={this.handleChange} required />
							</div>
							{this.state.emailError && <div className="alert alert-danger">{this.state.emailError}</div>}
							<div className="form-group">
								<input type="password" className="form-control" placeholder="Password" name="password" onChange={this.handleChange} required />
							</div>
							{this.state.passwordError && <div className="alert alert-danger">{this.state.passwordError}</div>}
							<div className="form-group">
								<button type="submit" className="btn btn-dark btn-block rounded-pill">
									Login
								</button>
							</div>
							<div class="form-group">
								<p>
									New user? <Link to="signup">Create new account</Link>
								</p>
							</div>
							{this.state.errorMessage && <div className="alert alert-danger">{this.state.errorMessage}</div>}
						</form>
					</div>
				</div>
			</div>
		);
	}
}

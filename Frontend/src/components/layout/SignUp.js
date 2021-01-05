import { render } from '@testing-library/react';
import React, { Component } from 'react';
import axios from 'axios';
const initialState = {
	user: {
		firstname: '',
		lastname: '',
		email: '',
		password: '',
		confirmPassword: '',
		errorMessage: '',
	},

	firstnameError: '',
	lastnameError: '',
	emailError: '',
	passwordError: '',
	confirmPasswordError: '',
};

export default class SignUp extends Component {
	constructor() {
		super();
		this.state = initialState;
	}
	/////////////////////////////////////////////////////////////////////////////////
	validate = () => {
		let firstnameError = '';
		let lastnameError = '';
		let emailError = '';
		let passwordError = '';
		let confirmPasswordError = '';
		let mailformat = '[A-Z0-9a-z.-_]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,3}';
		let passwordformat = '(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}';
		if (!this.state.user.firstname) {
			firstnameError = 'name cannot be blank ';
		}
		if (!this.state.user.lastname) {
			lastnameError = 'name cannot be blank ';
		}
		if (!this.state.user.email.match(mailformat)) {
			emailError = 'Please enter a valid email address';
		}
		if (!this.state.user.password.match(passwordformat)) {
			passwordError = 'The password should be Minimum eight characters, at least one uppercase letter, one lowercase letter and one number.';
		}
		if (this.state.user.password !== this.state.user.confirmPassword) {
			confirmPasswordError = 'Password not confirmed';
		}
		if (emailError || firstnameError || lastnameError || passwordError || confirmPasswordError) {
			this.setState({ firstnameError, lastnameError, emailError, passwordError, confirmPasswordError });
			return false;
		}
		return true;
	};
	//////////////////////////////////////////////////////////////////////////////////////////////////////
	handleSubmit = (e) => {
		e.preventDefault();
		const isValid = this.validate();
		if (isValid) {
			this.setState(initialState);
			const obj = { ...this.state.user, photo: 'null', projectsId: [] };
			delete obj.confirmPassword;
			delete obj.errorMessage;
			const options = {
				method: 'POST',
				data: obj,
				url: 'http://localhost:5000/api/user/register',
			};
			axios(options)
				.then((res) => {
					this.props.history.push('/signin');	
				})
				.catch((err) => {
					this.setState({
						errorMessage: err.response.data.status,
					});
				});
		}
	};
	//////////////////////////////////////////////////////////////////////////////////////////
	handleChange = (e) => {
		let state = { ...this.state.user };
		state[e.currentTarget.name] = e.currentTarget.value;
		this.setState({ user: state });
	};
	////////////////////////////////////////////////////////////////////////////////////////////////
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

						<span className="font-weight-bold d-block mb-2">To be connected with us, Please register to our website</span>

						<form onSubmit={this.handleSubmit}>
							<div className="form-group">
								<input
									type="text"
									className="form-control"
									placeholder="firstname"
									name="firstname"
									onChange={this.handleChange}
									value={this.state.user.firstname}
								/>
							</div>
							{this.state.firstnameError && <div className="alert alert-danger">{this.state.firstnameError}</div>}
							<div className="form-group">
								<input
									type="text"
									className="form-control"
									placeholder="lastname"
									name="lastname"
									onChange={this.handleChange}
									value={this.state.user.lastname}
								/>
							</div>
							{this.state.lastnameError && <div className="alert alert-danger">{this.state.lastnameError}</div>}
							<div className="form-group">
								<input type="text" className="form-control" placeholder="Email" name="email" onChange={this.handleChange} />
							</div>
							{this.state.emailError && <div className="alert alert-danger">{this.state.emailError}</div>}
							<div className="form-group">
								<input
									type="password"
									className="form-control"
									placeholder="Password"
									name="password"
									onChange={this.handleChange}
									value={this.state.user.password}
								/>
							</div>
							{this.state.passwordError && <div className="alert alert-danger">{this.state.passwordError}</div>}
							<div className="form-group">
								<input
									type="password"
									className="form-control"
									placeholder="Confirm Password"
									name="confirmPassword"
									onChange={this.handleChange}
									value={this.state.user.confirmPassword}
								/>
							</div>
							{this.state.confirmPasswordError && <div className="alert alert-danger">{this.state.confirmPasswordError}</div>}
							<div className="form-group">
								<button type="submit" className="btn btn-dark btn-block rounded-pill">
									Signup
								</button>
							</div>
							{this.state.errorMessage && <div className="alert alert-danger">{this.state.errorMessage}</div>}
						</form>
					</div>
				</div>
			</div>
		);
	}
}

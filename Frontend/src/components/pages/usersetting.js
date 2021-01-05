import React, { Component } from 'react';
import axios from 'axios';

export default class UserSetting extends Component {
	constructor() {
		super();
		this.state = {
			user: {
				firstname: '',
				lastname: '',
				email: '',
				password: '',
				newPassword: undefined,
				confirmPassword: undefined,
				facebook: '',
				github: '',
				linkedIn: '',
				photo: null,
			},
			passwordError:"",
			confirmPasswordError:"",
			uplodephoto: null,
		};
	}
	//////////////////////////////////////////////////////////////////////////////////////////////////////
	async componentDidMount() {
		const config = {
			headers: {
				Authorization: localStorage.getItem('token'),
			},
		};
		try {
			const res = await axios.get('http://localhost:5000/api/todo/profilesetting', config);
			const user = res.data.user;
			console.log("userfromdidmount",user)
			this.setState({ user },()=>{
				console.log("state:",this.state.user)
			});
		} catch (error) {
			console.log('resssssss', error.respond);
		}
	}
	////////////////////////////////////////////////////////////////////////////////////////////////
	handleSubmit = async (e) => {
		e.preventDefault();
		const isValid = this.validate();
		if (isValid) {
		const obj = {
			firstname: this.state.user.firstname,
			lastname: this.state.user.lastname,
			email: this.state.user.email,
			password: this.state.user.password,
			newPassword: this.state.user.newPassword,
			facebook: this.state.user.facebook,
			github: this.state.user.github,
			linkedIn: this.state.user.linkedIn,
		};
		const options = {
			method: 'PUT',
			headers: {
				Authorization: localStorage.getItem('token'),
			},
			data: obj,
			url: 'http://localhost:5000/api/todo/update',
		};

		axios(options)
			.then((res) => {
				const user = res.data.updatedUser;
				console.log("userfromsetting",user)
				this.props.setUser(user);
				this.props.history.push('/userhome');
			})
			.catch((err) => {
				console.log(err.response);
			});
		 }
	};
	////////////////////////////////////////////////////////////////////////////
	handleChange = (e) => {
		let state = { ...this.state.user };
		state[e.currentTarget.name] = e.currentTarget.value;
		this.setState({ user: state });
	};
	///////////////////////////////////////////////////////////////////////////////////////////////////////////

	updateHandler = (event) => {
		this.setState({
			uplodephoto: event.target.files[0],
			loaded: 0,
		});
	};
	/////////////////////////////////////////////////////////////////////
	validate = () => {
		debugger;
		if(!this.state.user.newPassword && !this.state.user.confirmPassword){
			return true ;
		}
		let passwordError = '';
		let confirmPasswordError = '';
		let passwordformat = '(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}';
		
		if (!this.state.user.newPassword.match(passwordformat)) {
			passwordError = 'The password should be Minimum eight characters, at least one uppercase letter, one lowercase letter and one number.';
		}
		if (this.state.user.newPassword !== this.state.user.confirmPassword) {
			confirmPasswordError = 'Password not confirmed';
		}
		if ( passwordError || confirmPasswordError) {
			this.setState({  passwordError, confirmPasswordError });
			return false;
		}
		return true;
	};

	///////////////////////////////////////////////////////////////////////////////////////////////////////////
	onClickHandler = async (e) => {
		e.preventDefault();
		const data = new FormData();
		data.append('file', this.state.uplodephoto);
		const options = {
			method: 'put',
			headers: {
				Authorization: localStorage.getItem('token'),
				'Content-Type': 'multipart/form-data',
			},
			data: data,
			url: 'http://localhost:5000/api/todo/uploadUserPhoto',
		};
		axios(options)
			.then((res) => {
				const user = res.data.user;
				this.props.setUser(user);
				this.props.history.push('/profile');
			})
			.catch((err) => {
				console.log(err.response);
			});
	};
	/////////////////////////////////////////////////////////////////////////////////////////////////
	render() {
		return (
			<div className="container mt-6">
				<div className="row justify-content-center">
					<div className="col-12 col-lg-10 col-xl-8 mx-auto">
						<h2 className="h3 mb-4 page-title">Settings</h2>
						<div className="my-4">
							<ul className="nav nav-tabs mb-4" id="myTab" role="tablist">
								<li className="nav-item">
									<a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="false">
										Profile Photo
									</a>
								</li>
							</ul>
							<form onSubmit={this.onClickHandler}>
								<div className="row mt-5 align-items-center">
									<div className="col-md-3 text-center mb-5">
										{
											this.state.user.photo  && this.state.user.photo != "null" ? 
												<img src={`.././uploadedPhotos/${this.state.user.photo}`} alt="..." className="avatar d-block mb-4 rounded-circle " width="200" height="200" />
											: null
										}
										<input type="file" name="file" onChange={this.updateHandler} />
									</div>
								</div>
								<button type="submit" className="btn btn-dark mb-5">
									upload
								</button>
							</form>
							<form onSubmit={this.handleSubmit}>
								<ul className="nav nav-tabs mb-4" id="myTab" role="tablist">
									<li className="nav-item">
										<a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="false">
											Profile Info
										</a>
									</li>
								</ul>
								<div className="form-row">
									<div className="form-group col-md-6">
										<label htmlFor="firstname">Firstname</label>
										<input
											type="text"
											id="firstname"
											className="form-control"
											value={this.state.user.firstname}
											onChange={this.handleChange}
											name="firstname"
										/>
									</div>
									<div className="form-group col-md-6">
										<label for="lastname">Lastname</label>
										<input type="text" id="lastname" className="form-control" value={this.state.user.lastname} onChange={this.handleChange} name="lastname" />
									</div>
								</div>
								<div className="form-group">
									<label htmlFor="inputEmail4">Email</label>
									<input type="email" className="form-control" id="inputEmail4" value={this.state.user.email} onChange={this.handleChange} name="email" />
								</div>
								<div className="form-group">
									<label htmlFor="inputfacebook">Facebook Link</label>
									<input
										type="text"
										className="form-control"
										id="inputfacebook"
										value={this.state.user.facebook}
										onChange={this.handleChange}
										name="facebook"
									/>
								</div>
								<div className="form-group">
									<label htmlFor="inputgithub">GitHub Link</label>
									<input type="text" className="form-control" id="inputgithub" value={this.state.user.github} onChange={this.handleChange} name="github" />
								</div>
								<div className="form-group">
									<label htmlFor="inputlinkedin">LinkedIn Link</label>
									<input
										type="text"
										className="form-control"
										id="inputlinkedin"
										value={this.state.user.linkedIn}
										onChange={this.handleChange}
										name="linkedIn"
									/>
								</div>

								<hr className="my-4" />
								<div className="row mb-4">
									<div className="col-md-6">
										<div className="form-group">
											<label htmlFor="inputPassword4">Old Password</label>
											<input
												type="password"
												className="form-control"
												id="inputPassword5"
												onChange={this.handleChange}
												value={this.state.user.password}
												name="password"
											/>
										</div>
										<div className="form-group">
											<label htmlFor="inputPassword5">New Password</label>
											<input
												type="password"
												className="form-control"
												id="inputPassword6"
												onChange={this.handleChange}
												value={this.state.newPassword}
												name="newPassword"
											/>
										</div>
										{this.state.passwordError && <div className="alert alert-danger">{this.state.passwordError}</div>}
										<div className="form-group">
											<label htmlFor="inputPassword6">Confirm Password</label>
											<input
												type="password"
												className="form-control"
												id="inputPassword7"
												onChange={this.handleChange}
												value={this.state.confirmPassword}
												name="confirmPassword"
											/>
										</div>
										{this.state.confirmPasswordError && <div className="alert alert-danger">{this.state.confirmPasswordError}</div>}
									</div>
									<div className="col-md-6">
										<p className="mb-2">Password requirements</p>
										<p className="small text-muted mb-2">To create a new password, you have to meet all of the following requirements:</p>
										<ul className="small text-muted pl-4 mb-0">
											<li>Minimum 8 character</li>
											<li>At least one uppercase letter</li>
											<li>At least one lowercase letter</li>
											<li>At least one number</li>
											<li>Can’t be the same as a previous password</li>
										</ul>
									</div>
								</div>
								<button type="submit" className="btn btn-dark">
									Save Change
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

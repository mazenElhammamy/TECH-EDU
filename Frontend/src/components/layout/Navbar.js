import React, { Component } from 'react';
import Search from './Search';
import { Link as LinkR } from 'react-router-dom';
import { Link as LinkS } from 'react-scroll';
import { animateScroll as scroll } from 'react-scroll';
import Intakes from './intakes';

export default class NavBar extends Component {
	render() {
		let buttons;
		if (this.props.loggedIn) {
			buttons = (
				<ul className="navbar-nav ml-auto">
					<li className="nav-item">
						<LinkR className="nav-link" to="/userhome">
							Home
						</LinkR>
					</li>

					<li className="nav-item">
						<LinkR className="nav-link" to="/addproject">
							Add Project
						</LinkR>
					</li>
					<li className="nav-item">
						<LinkR className="nav-link" to="/browseusers">
							Browse Users
						</LinkR>
					</li>

					<li class="nav-item dropdown">
						<a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">
							User Info
						</a>
						<div className="dropdown-menu">
							<LinkR className="dropdown-item" to="/profile">
								My Profile
							</LinkR>
							<LinkR className="dropdown-item" to="/usersetting">
								User Settings
							</LinkR>

							<LinkR
								className="dropdown-item"
								to="/"
								onClick={() => {
									this.props.removeUser();
								}}
							>
								Logout
							</LinkR>
						</div>
					</li>
				</ul>
			);
		} else {
			buttons = (
				<ul className="navbar-nav ml-auto">
					<li className="nav-item">
						<LinkR
							to="/"
							onClick={() => {
								scroll.scrollToTop();
							}}
							className="nav-link"
							style={{ cursor: 'pointer' }}
						>
							Home
						</LinkR>
					</li>
					<li className="nav-item">
						<LinkS to="who-we-are" smooth={true} duration={1000} offset={-50} className="nav-link" style={{ cursor: 'pointer' }}>
							About
						</LinkS>
					</li>
					<li className="nav-item">
						<LinkS to="Intakes" smooth={true} duration={1000} offset={-50} className="nav-link" style={{ cursor: 'pointer' }}>
							Intakes
						</LinkS>
					</li>
					<li className="nav-item">
						<LinkS to="contact" smooth={true} duration={1000} className="nav-link" style={{ cursor: 'pointer' }}>
							Contact
						</LinkS>
					</li>
					<li className="nav-item">
						<LinkR className="btn btn-outline-light nav-link" to="/browseusers">
							Browse Users
						</LinkR>
					</li>
				</ul>
			);
		}
		return (
			<nav className="navbar navbar-expand-md bg-dark navbar-dark fixed-top">
				<div className="container">
					<span className="navbar-brand text-uppercase font-weight-bold">
						<span className="text-grey">Tech</span>
						<span className="text-brand-primary">Edu</span>
					</span>

					<button className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
						<span className="navbar-toggler-icon"></span>
					</button>

					<div className="collapse navbar-collapse" id="navbarCollapse">
						<Search />
						{buttons}
					</div>
				</div>
			</nav>
		);
	}
}

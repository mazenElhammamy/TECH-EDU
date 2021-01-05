import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'jquery/dist/jquery';
import 'popper.js/dist/umd/popper';
import './App.css';
import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/pages/Home';
import ProjectByTrack from './components/pages/projectByTrack';
import NotFoundPage from './components/pages/NotFoundPage';
import Success from './components/pages/Success';
import UserHome from './components/pages/userhome';
import SignUp from './components/layout/SignUp';
import SignIn from './components/layout/SignIn';
import UserSetting from './components/pages/usersetting';
import AddProject from './components/pages/AddProject';
import axios from 'axios';
import Profile from './components/pages/profile';
import ProjectView from './components/pages/projectView';
import ProjectOwnerProfile from './components/layout/ProjectOwnerProfile';
import EditProject from './components/pages/editProject';
import BrowseUsers from './components/pages/browseUsers';
import Tracks from './components/pages/tracks';
import Admin from './components/pages/admin';
export default class App extends Component {
	constructor() {
		super();
		this.loading = false;
		this.state = {
			user: undefined,
			loggedIn: false,
			isAdmin: false,
			projectsByCategory: [],
		};
	}
	componentWillMount() {
		if (localStorage.getItem('token')) {
			this.loading = true
			const config = {
				headers: {
					Authorization: localStorage.getItem('token'),
				},
			};
		axios.get('http://localhost:5000/api/todo/profilesetting', config).then((res)=>{
			const user = res.data.user;
			this.setUser(user);
		}).catch (error => {
			console.log('resssssss', error.respond);
			this.loading = false;
		});
		}
	}

	setUser = (user) => {
		this.loading = true;
		this.setState({ user:user , loggedIn:true , isAdmin:user.admin}, () => {
			this.loading = false
		});
		
		};


	removeUser = () => {
		localStorage.clear();
		this.setState({ user: undefined, loggedIn:false});
	};
	render() {
		return (
			<div className="App">
				<Navbar loggedIn={this.state.loggedIn} removeUser={this.removeUser} />

				<Switch>
					<Route exact path="/" render={(props) => <Home isAdmin={this.state.isAdmin}  loggedIn={this.state.loggedIn} {...props} />}/>
					<Route exact path="/signup" component={SignUp} />
					<Route exact path="/signin" render={(props) => <SignIn setUser={this.setUser} {...props} />} />
			
					<Route exact path="/profile" render={(props) => ( this.loading || this.state.loggedIn  ? <Profile user={this.state.user} setUser={this.setUser} {...props} /> : <Redirect to='/signin' setUser={this.setUser} {...props}/>)} />
					<Route path="/userhome" render={(props) => ( this.loading || this.state.loggedIn   ? <UserHome isLoggedIn={this.state.loggedIn} user={this.state.user} isAdmin={this.state.isAdmin}  {...props} /> : <Redirect to='/signin' setUser={this.setUser} {...props}/>)} />
					<Route exact path="/usersetting" render={(props) => ( this.loading || this.state.loggedIn ? <UserSetting setUser={this.setUser} user={this.state.user} {...props} /> : <Redirect to='/signin' setUser={this.setUser} {...props}/>)} />
					<Route exact path="/addproject" render={(props) => ( this.loading || this.state.loggedIn  ? <AddProject setUser={this.setUser} {...props} /> : <Redirect to='/signin' setUser={this.setUser} {...props}/>)} />	
					<Route exact path="/editproject" component={EditProject} />					
					
					<Route exact path="/projectByTrack"  component={ProjectByTrack} />
					<Route exact path="/projectView" component={ProjectView} />
					<Route exact path="/ProjectOwnerProfile" component={ProjectOwnerProfile}/>
					
					<Route path="/tracks" component={Tracks} />
					<Route path="/admin" component={this.state.user && this.state.user.admin ? Admin: NotFoundPage } />
					<Route path="/success" component={Success} />
					<Route path="/browseusers" component={BrowseUsers} />
					<Route component={NotFoundPage} />
				</Switch>

				<Footer />
			</div>
		);
	}
}

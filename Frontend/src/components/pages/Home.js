import React, { Component } from 'react';
import Showcase from '../layout/Showcase';
import WhoWeAre from '../layout/WhoWeAre';
import FollowUs from '../layout/FollowUs';
import Contact from '../layout/Contact';
import Newsletter from './../layout/Newsletter';
import Intakes from '../layout/intakes';

export default class Home extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<React.Fragment>
				<Showcase loggedIn={this.props.loggedIn}/>
				<Newsletter history={this.props.history} />
				<WhoWeAre />
				<Intakes  history={this.props.history} isAdmin={this.props.isAdmin}/>
				<FollowUs />
				<Contact />
			</React.Fragment>
		);
	}
}

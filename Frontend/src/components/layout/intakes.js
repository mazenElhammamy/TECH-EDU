import React, { Component } from 'react';
import axios from 'axios';

export default class Intakes extends Component {
	constructor(props) {
		console.log(props)
		super(props);
		this.state = {
			intakesMap: {},
			intakes: [],

		};
	}

	async componentDidMount() {

		axios.get('http://localhost:5000/api/user/getAllIntakes')
			.then((res) => {
				const intakes = res.data.intakes
				const intakesMap = {};
				intakes.forEach((intake) => {
					const number = intake.intakeNumber;
					intakesMap[number] = intake.trackes;
				});
				console.log(intakesMap)
				this.setState({ intakes, intakesMap })
				console.log("intakes", intakes)
			})
			.catch((err) => {
				console.log("errrrrrr", err)
			});
	}
	///////////////////////////////////////////////////////////////////////

	getTracks = (e) => {
		let intake = e.currentTarget.value;
		const tracks = this.state.intakesMap[intake];
		console.log("tracks", tracks)
		this.props.history.push({
			pathname: '/tracks',
			state: { tracks, intake },
		})

	}



	render() {
		let addIcon;
		if(this.props.isAdmin ){
			addIcon =(
				<a href="/admin"><i class="fas fa-plus-circle fa-4x   "></i></a>
			)

			}else{
				addIcon =(
					<div></div>
				)
		}
		const sectionId = this.props.isLoggedIn ? "" : 'Intakes';

		return (
			<section id={sectionId} className="text-center py-5">


				<div className="container">

					<h2 > Intakes</h2>
					<p>Explore items created by our global community of independent designers and developers, confident they're hand-reviewed by us.</p>
					<hr className="bottom-border bottom-border-primary" />
					<div className="row">
						{this.state.intakes.map((intake, index) => (


							<div key={index} className="col-md-4">
								<div className="d-flex justify-content-between align-items-center">
									<button onClick={this.getTracks} value={intake.intakeNumber} className="btn btn-outline-dark btn-block">
										{`Intake ${intake.intakeNumber}`}
									</button>
								</div>
							</div>

						))}
					</div>

				</div>
				{addIcon}
			</section >
		);
	}
}

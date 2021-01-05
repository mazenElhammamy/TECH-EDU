import React, { Component } from 'react';
import axios from 'axios';
import Project from './../layout/project';

export default class AddProject extends Component {
	constructor() {
		super();
		this.state = {
			project: {
				projectName: '',
				trackName: '',
				description: '',
				github: '',
				intakeNumber:null,
				
				
			},
			intakesMap:{},
			intakes:[],
			uplodephoto: null,
		};
	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////
	async componentDidMount() {
		
		 
		axios.get('http://localhost:5000/api/user/getAllIntakes')
		.then((res) => {
			const intakes = res.data.intakes
			const intakesMap = {};
			intakes.forEach((intake)=>{
				const number = intake.intakeNumber;
				intakesMap[number]=intake.trackes;
			});
			console.log(intakesMap)
			this.setState({intakes,intakesMap})
			console.log("intakes",intakes)
	   })
	   .catch((err) => {
		  console.log("errrrrrr",err)
	   });
		}
	
	 
	
	//////////////////////////////////////////////////////////////////////////////////////////////////////

	handleSubmit = async (e) => {
		debugger;

		e.preventDefault();
		const data = new FormData();
		if (this.state.uplodephoto) {
			data.append('file', this.state.uplodephoto);
		}
		data.append('projectName', this.state.project.projectName);
		data.append('trackName', this.state.project.trackName);
		data.append('description', this.state.project.description);
		data.append('github', this.state.project.github);
		data.append('intakeNumber', this.state.project.intakeNumber);
		const options = {
			method: 'POST',
			headers: {
				Authorization: localStorage.getItem('token'),
				'Content-Type': 'multipart/form-data',
			},
			data: data,
			url: 'http://localhost:5000/api/todo/addProject',
		};

		axios(options)
			.then((res) => {
				const user = res.data.user
				this.props.setUser(user);
				this.props.history.push('/userhome');

			})
			.catch((err) => {
				console.log("errrrrrrrr", err.response);
			});
	};
	////////////////////////////////////////////////////////////////////////////
	handleChange = (e) => {
		
		let state = { ...this.state.project };
		state[e.currentTarget.name] = e.currentTarget.value;
		this.setState({ project: state });
		console.log(this.state.intakes)
	};
	///////////////////////////////////////////////////////////////////////////////////////////////////////////

	updateHandler = (event) => {
		this.setState({
			uplodephoto: event.target.files[0],
			loaded: 0,
		});
	};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
	getTracksOptions(){
		const selectedIntake = this.state.project.intakeNumber;
		if(selectedIntake){
			const tracks = this.state.intakesMap[selectedIntake];
			return tracks.map((track,index) => {
				return (
					<option  key={index} value={track}>{track}</option>
				)
				})
		}
		return null
	}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
	render() {
		return (
			<div className="container mt-6">
				<div className="row">
					<div className="col-12 col-lg-10 col-xl-8 mx-auto">
						<h2 className="h3 mb-4 page-title">Add New Project</h2>
						<div className="my-4">
							<ul className="nav nav-tabs mt-4" id="myTab" role="tablist">
								<li className="nav-item">
									<a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="false">
										Project Photo
									</a>
								</li>
							</ul>
							<form onSubmit={this.onClickHandler}>
								<div className="row mt-5 align-items-center">
									<div className="col-md-3 text-center mb-5">
										<input type="file" name="file" onChange={this.updateHandler} />
									</div>
								</div>
							</form>
							<hr className="my-4" />
							<form onSubmit={this.handleSubmit}>
								<ul className="nav nav-tabs mb-4" id="myTab" role="tablist">
									<li className="nav-item">
										<a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="false">
											Project Info
										</a>
									</li>
								</ul>
								<div className="form-group">
									<label htmlFor="projectName">
										Project Name <span className="text-danger">*</span>
									</label>
									<input
										type="text"
										id="projectName"
										className="form-control"
										value={this.state.project.projectName}
										onChange={this.handleChange}
										name="projectName"
										required
									/>
								</div>
							
								<div className="form-group">
									<label for="projectCategory">
										Intake <span className="text-danger">*</span>{' '}
									</label>
									<select
										className="form-control"
										aria-label="Default select example"
										id="projectCategory"
										value={this.state.intakeNumber}
										onChange={this.handleChange}
										name="intakeNumber"
										required
									>
										
										<option selected>Choose from these intakes:</option>
										
										{this.state.intakes.map((intake,index) => {
                                            return (
												<option key={index} value={intake.intakeNumber}>{intake.intakeNumber}</option>
                                            )
                                        })}
										
									</select>
								</div>
								<div className="form-group">
									<label for="projectCategory">
										Tracke <span className="text-danger">*</span>{' '}
									</label>
									<select
										className="form-control"
										aria-label="Default select example"
										id="projectCategory"
										value={this.state.project.trackName}
										onChange={this.handleChange}
										name="trackName"
										required
									>
									<option selected>Choose from these trackes:</option>
									{
										this.getTracksOptions()
									}
										
									</select>
								</div>
								<div className="form-group">
									<label htmlFor="description">
										Project Description <span className="text-danger">*</span>
									</label>
									<textarea
										rows="10"
										className="form-control"
										id="description"
										value={this.state.project.description}
										onChange={this.handleChange}
										name="description"
										required
									></textarea>
								</div>
								<div className="form-group">
									<label htmlFor="projectLink">Project Link</label>
									<input
										type="text"
										id="projectLink"
										className="form-control"
										value={this.state.project.github}
										onChange={this.handleChange}
										name="github"
									/>
								</div>
								<button type="submit" className="btn btn-dark">
									Add Project
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

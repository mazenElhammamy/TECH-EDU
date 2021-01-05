import React, { Component } from 'react';
import axios from 'axios';



export default class EditProject extends Component {
	constructor(props) {
        console.log("edirprops",props)
		super(props);
		this.state = {
			project: {
                _id:this.props.location.state.project._id ,
                userId:this.props.location.state.project.userId ,
				projectName: this.props.location.state.project.projectName ,
				intakeNumber: this.props.location.state.project.intakeNumber,
				trackName: this.props.location.state.project.trackName,
				description: this.props.location.state.project.description,
                github: this.props.location.state.project.github,
                photo:this.props.location.state.project.photo,
				
			},
			intakesMap:{},
			intakes:[],
			uplodephoto: null,
		};
	}
	//////////////////////////////////////////////////////////////////////////////////////////////////////
		getOptions(){
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
		////////////////////////////////////////////////////////////////////////////////
		getTracksOptions(){
			if(Object.keys(this.state.intakesMap).length === 0){
				axios.get('http://localhost:5000/api/user/getAllIntakes')
				.then((res) => {
					const intakes = res.data.intakes
					const intakesMap = {};
					intakes.forEach((intake)=>{
						const number = intake.intakeNumber;
						intakesMap[number]=intake.trackes;
					});
					console.log(intakesMap)
					this.setState({intakes,intakesMap},()=>{
						return this.getOptions();
					})
			
					console.log("intakes",intakes)
			   })
			   .catch((err) => {
				  console.log("errrrrrr",err)
			   });
			}else{
				return this.getOptions();
			}
			
			
		}
	






	////////////////////////////////////////////////////////////////////////////

	handleSubmit = async (e) => {
debugger;
		e.preventDefault();
		const data = new FormData();
		if (this.state.uplodephoto) {
			data.append('file', this.state.uplodephoto);
        }
        data.append('_id', this.state.project._id);
        data.append('userId', this.state.project.userId);
		data.append('projectName', this.state.project.projectName);
		data.append('trackName', this.state.project.trackName);
		data.append('description', this.state.project.description);
		data.append('github', this.state.project.github);
		data.append('intakeNumber', this.state.project.intakeNumber);
		data.append('photo', this.state.project.photo);
		
		
       
		const options = {
			method: 'PUT',
			data: data,
			url: 'http://localhost:5000/api/user/editProject',
		};

		axios(options)
			.then((res) => {
                //const project = res.data.project
				this.props.history.push('/profile');
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
	};
	///////////////////////////////////////////////////////////////////////////////////////////////////////////

	updateHandler = (event) => {
		this.setState({
			uplodephoto: event.target.files[0],
			loaded: 0,
		});
	};


	render() {
		return (
           
           
			<div className="container mt-6">
				<div className="row">
					<div className="col-12 col-lg-10 col-xl-8 mx-auto">
						<h2 className="h3 mb-4 page-title">Edit Project</h2>
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
										{
											this.state.project.photo  && this.state.project.photo != "null" ? 
												<img src={`.././uploadedPhotos/${this.state.project.photo}`} alt="..." className="avatar d-block mb-4 rounded-circle " width="200" height="200" />
											: null
										}
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
									Edit
								</button>
							</form>
						</div>
					</div>
				</div>
            </div>
           
		);
	}
}

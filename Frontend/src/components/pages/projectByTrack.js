import React, { Component } from 'react';

import axios from 'axios';

export default class ProjectByTrack extends Component {
	constructor(props) {
		super(props);
		console.log("ProjectByTrack:", props)
		this.state = {
			projects: this.props.history.location.state ? this.props.history.location.state.projectsByTrack || [] : []
		};
		console.log(this.state)
	}

	handleClick =(e)=>{
		let projectName = e.currentTarget.value;
		console.log("projectName",projectName)
		const options = {
			method: 'POST',
			data: { projectName: projectName },
			url: 'http://localhost:5000/api/user/projectDetails',
		};
		axios(options)
			.then((res) => {
				const projectDetails = res.data.projectDetails;
				this.props.history.push({
					pathname:'/projectView',
					state: {projectDetails},
				})
			})
			.catch((err) => {
				console.log(err);
			});
	};


	render() {

		return (
			
		
			<div className="container mt-6">
				{
				this.state.projects.length > 0 ? 

					<div className="row">
						{this.state.projects.map((project, index) => {
							console.log(project)
							const imageSrc = project.photo && project.photo !== "null" ?
								`.././uploadedPhotos/${project.photo}`
								: `.././img/defaultProject.png`;

							return (
								<div className="col-md-4">
									<div key={project._id} className="card mb-4 box-shadow">
										<img
											className="card-img-top"
											data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail"
											alt={project.projectName}
											style={{ height: '225px', objectFit: 'cover' }}
											src={imageSrc}
											data-holder-rendered="true"
										/>
										<div className="card-body bg-secondary">
											<h5 className="card-text">{project.projectName}</h5>
											<p className="text-truncate">{project.description}</p>
											<p className="text-truncate">{project.trackName}</p>
											<p className="text-truncate">{` Intake ${project.intakeNumber}`}</p>
											<div className="d-flex justify-content-between align-items-center">
												<button onClick={this.handleClick} name="projectName" value={project.projectName} className="btn btn-outline-dark btn-block">
													View
							</button>
											</div>
										</div>
									</div>
								</div>
							);
						})}

					</div>
				: 
				<div class="jumbotron text-center mt-5 ">
					<p class="lead">There is no projects.</p> 
			
				</div>
			}
			</div>
		)

			;
	}
}

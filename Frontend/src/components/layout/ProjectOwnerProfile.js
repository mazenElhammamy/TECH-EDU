import React, { Component } from "react";
import axios from "axios";

export default class ProjectOwnerProfile extends Component {
  constructor(props) {
    super(props);
    console.log("ProjectOwnerProfile", props)
    this.state = {
      user: props.history.location.state ? props.history.location.state.user : {},
      projects: [],
    };
  }

  ///////////////////////////////////////////////////////////////////////
  async componentDidMount() {
    if(this.state.user){
      const data = {
        email: this.state.user.email,
      };
  
      const options = {
        method: "POST",
        data: data,
        url: "http://localhost:5000/api/user/getUserProjects",
      };
      console.log("options", options);
      axios(options)
        .then((res) => {
          const projects = res.data.projects;
          this.setState({ projects });
        })
        .catch((err) => {
          console.log("errrrrrrrr", err.response);
        });
    }

  }
  ////////////////////////////////////////////////////////////////////////////////////////
  projectDetails = (e) => {
    let projectName = e.currentTarget.value;
    console.log("projectName", projectName)
    const options = {
      method: 'POST',
      data: { projectName: projectName },
      url: 'http://localhost:5000/api/user/projectDetails',
    };
    axios(options)
      .then((res) => {
        const projectDetails = res.data.projectDetails;
        this.props.history.push({
          pathname: '/projectView',
          state: { projectDetails },
        })
      })
      .catch((err) => {
        console.log(err);
      });
  };
  ///////////////////////////////////////////////////////////////////////

  render() {
    const imageSrc = this.state.user.photo && this.state.user.photo != "null" ? `.././uploadedPhotos/${this.state.user.photo}`
    : `.././img/default.png`;
  
    return (
      <div className="container mt-6">
			
					<div>
						<div className="row">
							<div className="col m-auto">
								<div id="userProfile" className="bg-dark p-3 rounded">
									<div className="row">
										<div id="user-img" className="col-lg-6 text-center">
											<img src={imageSrc} alt="avatar" className="avatar rounded-circle border border-light border-5" width="250" height="250" />
										</div>

										<div id="user-info" className="col-lg-6 d-flex flex-column justify-content-around text-center">
											<div id="user-name">
												<h2 className="mt-3">
													{this.state.user.firstname} {this.state.user.lastname}
												</h2>
											</div>

											<div id="user-social-links" className="mt-3">
												<a className="mr-5" href={this.state.user.facebook} target="_blank">
													<i class="fab fa-facebook fa-3x"></i>
												</a>
												<a className="mr-5" href={this.state.user.linkedIn} target="_blank">
													<i class="fab fa-linkedin fa-3x"></i>
												</a>
												<a href={this.state.user.github} target="_blank">
													<i class="fab fa-github fa-3x"></i>
												</a>
											</div>

											<div id="user-email" className="mt-3">
												<p>
													<span className="font-weight-bold">Email : &nbsp; </span> {this.state.user.email}
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="row text-center mt-3">
							<div className="col">
								<h2>Projects</h2>
								<hr className="bottom-border bottom-border-primary" />
							</div>
						</div>

						<div className="row mt-4">
							{this.state.projects.map((project, index) => {
								return (
									<div className="col-lg-4" key={project._id}>
										<div className="card mb-4 shadow-sm">
											<img
												className="card-img-top"
												data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail"
												alt={project.projectName}
												style={{ height: '225px', objectFit: 'cover' }}
												src={`.././uploadedPhotos/${project.photo}`}
												data-holder-rendered="true"
											/>
											<div className="card-body bg-secondary text-center">
												<h5 className="card-text">{project.projectName}</h5>
												<div className="d-flex justify-content-between align-items-center">
												
                          <button onClick={this.projectDetails} name="projectName" value={project.projectName} className="btn btn-outline-dark btn-block">
                            View
							              </button>
												
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				) 
			</div>
    )
  

  }
}
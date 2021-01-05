import React, { Component } from 'react';
import axios from 'axios';

export default class ProjectView extends Component {
    constructor(props) {
        console.log("props from projectview", props)
        super(props)
        this.state = {
            projectDetails: this.props.location.state ? this.props.location.state.projectDetails || {} : {}
        }
    }
    //////////////////////////////////////////////////////////////////////////////////
    getOwnerProfile=()=>{
        
        const userId = this.state.projectDetails.userId;

        if(userId){
            const options = {
                method: 'POST',
                data: { userId: userId },
                url: 'http://localhost:5000/api/user/getProjectOwnerProfile',
            };
            axios(options)
                .then((res) => {
                    const user = res.data.user;
                    this.props.history.push({
                        pathname:'/ProjectOwnerProfile',
                        state: {user},
                    })
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
    //////////////////////////////////////////////////////////

      ///////////////////////////////////////////////////////////
    render() {
        const imageSrc = this.state.projectDetails.photo && this.state.projectDetails.photo != "null" ? 
        `.././uploadedPhotos/${this.state.projectDetails.photo}`
        : `.././img/defaultProject.png`;

        return (
            <React.Fragment>
			<section>
				<div className="container mt-6 shadow p-4 bg-light rounded">
					<div className="row d-flex align-items-center justify-content-between">
						<div className="col-md-6">
							
							<p>
                            {this.state.projectDetails.description}
							</p>
						</div>
						<div className="col-md-6">
							<img src={imageSrc} alt="Sass Project" className="img-fluid rounded" />
						</div>
					</div>
				</div>
			</section>
			<section>
				<div className="container">
					<div className="row py-5">
						<div className="col-md-4 bg-primary text-center p-4 rounded-left">
							<i class="fas fa-file-signature fa-4x d-block mb-3"></i> <span className="mr-3">{this.state.projectDetails.projectName}</span>
						</div>
						<div className="col-md-4 bg-dark text-center p-4">
							<i className="fa fa-list-alt fa-4x d-block mb-3" aria-hidden="true"></i>
                            {` Intake ${this.state.projectDetails.intakeNumber}`} <p/>
                           { `Track : ${this.state.projectDetails.trackName}`}
						</div>
						<div id="profile-view-github" className="col-md-4 bg-primary text-center p-4 rounded-right">
							<a href={this.state.projectDetails.github} target="_blank" className="text-decoration-none">
								<i className="fab fa-github-alt fa-4x d-block mb-3"></i> Github Profile
							</a>
						</div>
					</div>
					<div className="row">
						<div id="owner-Profile-btn" className="col">
							<button onClick={this.getOwnerProfile} className="btn btn-dark btn-block p-4 font-weight-bold">
								View Owner Profile
							</button>
						</div>
					</div>
				</div>
			</section>
		</React.Fragment>
         
        )
    }
}
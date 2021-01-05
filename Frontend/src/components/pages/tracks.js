import React, { Component } from 'react';

import axios from 'axios';

export default class Tracks extends Component {
	constructor(props) {
		super(props);
		this.state = {
            tracks: this.props.location.state ? this.props.location.state.tracks || [] : [] ,
            intake:this.props.location.state ? this.props.location.state.intake || null : null ,
		};
    }
    ///////////////////////////////////////////
    	handleClick =(e)=>{
            debugger;
        let trackName = e.currentTarget.value;
        let intakeNumber = this.state.intake
		const options = {
			method: 'POST',
            data: {
                trackName: trackName,
                 intakeNumber:intakeNumber
            },
			url: 'http://localhost:5000/api/user/projectsByTrack',
		};
		axios(options)
			.then((res) => {
                const projectsByTrack = res.data.projectsByTrack;
                console.log("projectdetails",projectsByTrack)
				this.props.history.push({
					pathname:'/projectByTrack',
					state: {projectsByTrack},
				})
			})
			.catch((err) => {
				console.log(err);
			});
	};
		

    ///////////////////////////////////////////////////
    

	
		
	
	render() {
		
		return(
            <div className="container  mt-6">
                	<h2 className="text-center"> Tracks</h2>
					<p>Explore items created by our global community of independent designers and developers, confident they're hand-reviewed by us.</p>
					<hr className="bottom-border bottom-border-primary" />
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <table className="table table-striped">
                                <thead className="thead-dark">
                                    <tr>
                                        <th>Available Tracks </th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.tracks.map((track,index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{track}</td>
                                                <td>
                                                    <button onClick={this.handleClick} name={track} value={track} className="btn btn-dark">
                                                     <i className="fas fa-angle-double-right"></i> View Projects
                                                </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
		)
	
		;
	}
}

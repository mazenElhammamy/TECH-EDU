import React, { Component } from 'react';
import { Multiselect } from "multiselect-react-dropdown"

import axios from 'axios';

const   DEFAULT_TRACKS = [
    { id: 1, trackName: 'Enterprise & Web Apps Development ' },
    { id: 2, trackName: 'Open Source' },
    { id: 3, trackName: 'Mobile Application Development' },
    { id: 4, trackName: 'Cloud Platform' },
    { id: 5, trackName: 'Internet of things' },
    { id: 6, trackName: 'Applications Development' },
    { id: 7, trackName: 'Software Architecture' },
    { id: 8, trackName: 'Professional Web Development &BI' },
    { id: 9, trackName: 'Cross Platform Mobile Application' },
    { id: 10, trackName: 'Telecom Application Development' },
    { id: 11, trackName: '2D animation and Motion Graphics' },
    { id: 12, trackName: 'Web & User Interface' },
    { id: 13, trackName: '3D Art' },
    { id: 14, trackName: 'Game Programming' },
    { id: 15, trackName: 'Game Art' },
    { id: 16, trackName: 'VFX Compositing ' },
    { id: 17, trackName: 'Freelancing' },
    { id: 18, trackName: 'Data Management' },
    { id: 19, trackName: 'Civil Engineering Informatics' },
    { id: 20, trackName: 'Data Science' },
    { id: 21, trackName: 'ERP Consulting' },
    { id: 22, trackName: 'GIS' },
    { id: 23, trackName: 'System Administration' },
    { id: 24, trackName: 'Digital IC Design' },
    { id: 25, trackName: 'Embedded' },
    { id: 26, trackName: 'Industrial Automation' },
    { id: 27, trackName: 'Mechatronics' },
    { id: 28, trackName: 'Wireless Communications' },
    { id: 29, trackName: 'Software Testing & Quality Assurance' },

];
export default class Admin extends Component {
    constructor() {
        super()
        this.multiselectRef = React.createRef();
        this.state = {
            intakeNumber: null,
        }
    }
    //////////////////////////////////////////////////

handleChange = (e) => {
    this.setState({
        intakeNumber: e.currentTarget.value
    });
};
//////////////////////////////////////////////////////////////
submitHandler = async (e) => {
    e.preventDefault();
    const selectedTracks = this.multiselectRef.current.state.selectedValues.map((value)=>{
        return value.trackName;
    });
    const selectedIntakeNumber = this.state.intakeNumber;
    const options = {
        method: 'POST',
        data: {
            intakeNumber: selectedIntakeNumber, 
            trackes: selectedTracks
        },
        url: 'http://localhost:5000/api/user/addIntake',
    };
    axios(options)
        .then((res) => {
            console.log("res",res)
            // const user = res.data.user;
            // this.props.setUser(user);
            this.props.history.push('/Success')
        })
        .catch((err) => {
            console.log("error",err.response);
        });
};




    render() {
        return (

            <div className="container mt-6">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-10 col-xl-8 mx-auto">
                        <div className="my-4">
                            <ul className="nav nav-tabs mb-4" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="false">
                                        Add Intak 
									</a>
                                </li>
                            </ul>
                            <form onSubmit={this.submitHandler}>
                            <div className="form-row">
									<div className="form-group col-md-6">
										<label htmlFor="firstname">Intake Number</label>
										<input
											type="number"
											id="intakeNumber"
											className="form-control"
											onChange={this.handleChange}
											name="intakeNumber"
										/>
									</div>
									
								</div>
                                <div className="form-group">
									<label htmlFor="inputEmail4">Tracks</label>
									<Multiselect ref={this.multiselectRef} options={DEFAULT_TRACKS} displayValue="trackName" name="trackes" />
                                    </div>
                                <button type="submit" className="btn btn-dark mb-5">
                                    Add
								</button>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
               









            // <div className=" container mt-6" style={{ width: "90%", justifyContent: "center", display: "flex" }}>
                    //     <h1>Select Tracks</h1>
            //     <Multiselect options={this.state.Tracks} displayValue="trackName" />

            // </div>
        )
    }
}
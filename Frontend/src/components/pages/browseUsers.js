import React, { Component } from 'react';
import UserSearch from './../layout/userSearch';
import axios from 'axios';



export default class BrowseUsers extends Component {
    constructor() {
        super();
        this.state = {
            userList:[],
            filteredList:[],
        }
    }
    //////////////////////////////////////////////////////////////////////////////////
    async componentDidMount(){
     await axios.get('http://localhost:5000/api/user/getAllUsers')
        .then((res) => {
         const users=res.data.users
         this.setState({userList:users,filteredList:users})
        })
        .catch((err) => {
            console.log(err)
        });
    }

       search=(searchText)=>{
        const filteredList = this.state.userList.filter(user => user.firstname.toLowerCase().includes(searchText.toLowerCase())
        || user.lastname.toLowerCase().includes(searchText.toLowerCase()));

            this.setState({filteredList})
           }
///////////////////////////////////////////////////////////////////////////////////
getOwnerProfile(userId){
    console.log("userid",userId)
        
                    const options = {
                        method: 'POST',
                        data:  { userId: userId } ,
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
                            console.log("errrrrrrrrrrrrrr",err);
                        });
                
            }
    /////////////////////////////////////////////////////////////////////////////

    render(){
        return(
            <div className="container mt-6">
                <UserSearch onsearch={this.search}/>
                <div id="teams">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Browse Users</h4>
                                </div>
                                <table className="table table-striped">
                                    <thead className="thead-dark">
                                        <tr>

                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Email</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.filteredList.map((user,index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{user.firstname}</td>
                                                    <td>{user.lastname}</td>
                                                    <td>{user.email}</td>
                                                    <td>
                                                        <button onClick={() => this.getOwnerProfile(user._id)} className="btn btn-dark">
                                                         <i className="fas fa-angle-double-right"></i> Details
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
            </div>
            </div>
        )
    }
}



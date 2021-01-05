import React,{Component} from'react';
export default class UserSearch extends Component{
    constructor(){
        super()
        this.state = {
            searchText:""
        };
    }
    search = (e)=>{
        console.log(e)
        this.props.onsearch(e.target.value);

         
    };

    render(){
        
        return(
            
            
                <div id="search" className="mt-6 mb-4">
					<div className="container">
						<div className="row">
							<div className="col-md-6 m-auto">
								<div className="input-group">
									<input onChange={this.search} type="text" className="form-control bg-secondary" placeholder="Search Teams...." />
								</div>
							</div>
						</div>
					</div>
				</div>
           
        )
    }
}
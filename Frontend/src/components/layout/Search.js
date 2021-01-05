import React from 'react';

function Search() {
	return (
		<form className="form-inline w-50 m-auto justify-content-center">
			<input className="form-control w-75 mr-2" type="search" placeholder="Find Awesome Projects" aria-label="Search" />
			<button className="btn btn-outline-light" type="submit">
				<i className="fas fa-search"></i>
			</button>
		</form>
	);
}

export default Search;

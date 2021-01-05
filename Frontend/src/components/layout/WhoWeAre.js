import React from 'react';

function WhoWeAre() {
	return (
		<section id="who-we-are" className="py-5 text-center bg-light">
			<div className="container">
				<h2 className="mb-4">Who We Are</h2>

				<hr className="bottom-border bottom-border-primary" />

				<p>404Error are the creator of TechEdu</p>
				<div className="row">
					<div className="col-md-6">
						<img src="./img/team.jpg" alt="techedu creators" className="img-fluid mb-3 rounded-circle" />
					</div>
					<div className="col-md-6 text-left">
						<p className="font-weight-bold mb-4">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, temporibus ratione! Enim laborum recusandae asperiores dicta ipsa est,
							accusantium impedit a, nemo corporis sed voluptatibus debitis! Alias tempora dolores qui.
						</p>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam delectus nulla mollitia quidem itaque sunt assumenda voluptas excepturi commodi
							non.
						</p>

						<div className="d-flex">
							<div className="p-4 align-self-start">
								<i className="fas fa-check fa-2x"></i>
							</div>
							<div className="p-4 align-self-end">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, adipisci. Et optio earum voluptate mollitia.
							</div>
						</div>
						<div className="d-flex">
							<div className="p-4 align-self-start">
								<i className="fas fa-check fa-2x"></i>
							</div>
							<div className="p-4 align-self-end">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, adipisci. Et optio earum voluptate mollitia.
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default WhoWeAre;

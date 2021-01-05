import React from "react";

export default function Project(props) {
  const { project } = props;
  return (
    <div key={project._id} className="card">
      <a href={`/project/${project._id}`}>
        <img className="medium" src={project.img} alt={project.projectName} />
      </a>
      <div className="card-body">
        <a href={`/project/${project._id}`}>
          <h2>{project.projectName}</h2>
        </a>
      </div>
    </div>
  );
}

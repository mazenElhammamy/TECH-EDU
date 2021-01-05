const mongoose = require('mongoose');
const Project = mongoose.model('Project', {
	projectName: {
		type: String,
		required: true,
	},
	
	description: {
		type: String,
		required: true,
	},
	github: {
		type: String,
	},
	photo:{
		type: String,
	},
	userId:{
		type:String,
		required: true

	},
	intakeNumber:{
		type:String,
		required: true
	},
	trackName:{
		type:String,
		required: true
	}
	
});

module.exports = Project;

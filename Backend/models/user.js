const mongoose = require('mongoose');
const User = mongoose.model('User', {
	firstname: {
		type: String,
		required: true,
	},
	lastname: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	photo: {
		type: String,
		required: true,
	},
	projectsId: {
		type: [],
		required: true,
	},

	facebook: {
		type: String,
	},
	github: {
		type: String,
	},
	linkedIn: {
		type: String,
	},
	admin :{
		type: Boolean,
		default:false 
	}
});
module.exports = User;

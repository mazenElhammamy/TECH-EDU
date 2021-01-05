const mongoose = require('mongoose');
const Intake = mongoose.model('Intake', {
	intakeNumber: {
		type: Number,
        unique: true,
        required: true,
	},
	trackes:{
		type:[],
		required: true

	}
});
module.exports = Intake;

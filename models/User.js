const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
		min: 6,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	type: {
		type: String,
		required: true,
	},
	ratings: [
		{
			uid: String,
			rating: Number,
			username: String,
		},
	],
	schedule: [
		{
			start: {
				type: Date,
				default: Date.now,
			},
			end: {
				type: Date,
				default: Date.now,
			},
		},
	],
});

module.exports = mongoose.model('User', UserSchema);

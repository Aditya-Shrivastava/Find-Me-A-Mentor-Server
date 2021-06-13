const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
	{
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
		type: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			default: null,
		},
		image: {
			type: String,
			default: process.env.FIREBASE_STORAGE_IMAGE,
		},
		bio: {
			type: String,
			default: null,
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
				type: mongoose.Types.ObjectId,
				ref: 'Slot',
				default: null,
			},
		],
	},
	{ strict: false }
);

module.exports = mongoose.model('User', UserSchema);

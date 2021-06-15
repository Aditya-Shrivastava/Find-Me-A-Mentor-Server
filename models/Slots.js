const mongoose = require('mongoose');

const SlotSchema = mongoose.Schema({
	date: {
		type: Date,
		required: true,
	},
	creator: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	creator_details: {
		name: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
	},
	booker: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
		default: null,
	},
	booker_details: {
		name: {
			type: String,
			default: null,
		},
		image: {
			type: String,
			default: null,
		},
	},
	isBooked: {
		type: Boolean,
		default: false,
	},
});

module.exports = mongoose.model('Slot', SlotSchema);

const mongoose = require('mongoose');

const SlotSchema = mongoose.Schema({
	date: {
		type: String,
		required: true,
	},
	time: {
		type: String,
		required: true,
	},
	creator: {
		type: String,
		required: true,
	},
	booker: {
		type: String,
		default: null,
	},
	isBooked: {
		type: Boolean,
		default: false,
	},
});

module.exports = mongoose.model('Slot', SlotSchema);

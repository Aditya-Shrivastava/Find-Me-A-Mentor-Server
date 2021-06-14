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
	booker: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
		default: null,
	},
	isBooked: {
		type: Boolean,
		default: false,
	},
});

module.exports = mongoose.model('Slot', SlotSchema);

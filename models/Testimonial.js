const mongoose = require('mongoose');

const TestimonialSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	userImage: {
		type: String,
		required: true,
	},
	body: {
		type: String,
		required: true,
		maxLength: 140,
	},
	category: {
		type: String,
		default: null,
	},
});

module.exports = mongoose.model('Testimonial', TestimonialSchema);

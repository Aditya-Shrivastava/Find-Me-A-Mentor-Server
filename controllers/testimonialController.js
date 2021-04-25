const Testimonial = require('../models/Testimonial');

const fetchTestimonials = async (req, res) => {
	const testimonials = await Testimonial.find();

	res.status(200).json(testimonials);
};

const addTestimonial = async (req, res) => {
	const { username, userImage, body, category } = req.body;
	if (!username || !userImage || !body) {
		return res
			.status(400)
			.json({ error: 'Bad Request, missing some fields' });
	}

	const testimonial = new Testimonial({
		username,
		userImage,
		body,
		category,
	});

	try {
		await testimonial.save();
		res.status(200).json(testimonial);
	} catch (error) {
		res.status(400).json(error);
	}
};

const deleteTestimonial = async (req, res) => {
	const id = req.params.id;

	const testimonial = await Testimonial.findById(id);
	if (!testimonial) {
		return res.status(404).json({ error: 'Testimonial not found.' });
	}

	try {
		await testimonial.delete();
		res.status(200).json({ message: 'Testimonial deleted successfully' });
	} catch (error) {
		res.status(400).json(error);
	}
};

exports.fetchTestimonials = fetchTestimonials;
exports.addTestimonial = addTestimonial;
exports.deleteTestimonial = deleteTestimonial;

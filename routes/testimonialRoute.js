const router = require('express').Router();
const {
	fetchTestimonials,
	addTestimonial,
	deleteTestimonial,
} = require('../controllers/testimonialController');
const verifyToken = require('../middleware/verifyToken');

// Fetch all testimonials
router.get('/', fetchTestimonials);

// Add new testimonial
router.post('/add', verifyToken, addTestimonial);

// Private Route
// Delete testimonial
router.delete('/:id', verifyToken, deleteTestimonial);

module.exports = router;

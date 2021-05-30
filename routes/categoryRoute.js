const router = require('express').Router();
const {
	fetchCategories,
	fetchCategoryMentors,
	addCategory,
	deleteCategory,
} = require('../controllers/categoryController');
const verifyToken = require('../middleware/verifyToken');

// Fetch all categories
router.get('/', fetchCategories);

// fetch mentors for a category
router.get('/:cname', fetchCategoryMentors);

// Private Routes
// Add category
router.post('/add', verifyToken, addCategory);

// Delete category
router.delete('/:cid', verifyToken, deleteCategory);

module.exports = router;

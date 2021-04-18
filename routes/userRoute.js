const router = require('express').Router();

const {
	fetchUserDetails,
	deleteUser,
	updateUserDetails,
} = require('../controllers/userController');

// Fetch user details
router.get('/:uid', fetchUserDetails);

// Update user details
router.patch('/:uid', updateUserDetails);

// Delete user from DB
router.delete('/:uid', deleteUser);

module.exports = router;

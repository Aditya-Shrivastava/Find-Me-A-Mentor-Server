const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const { fetchUserDetails } = require('../controllers/userController');

// Fetch user details
router.get('/:uid', fetchUserDetails);

// Delete user from DB
router.delete('/delete', async (req, res) => {
	// Validate user
	const user = await User.findById(req.user.uid);
	const password = req.body.password;

	if (!password) {
		return res.status(400).json({ error: 'Bad Request' });
	}

	const isValidUser = bcrypt.compare(req.body.password, user.password);

	if (!isValidUser) {
		return res.status(400).json({ error: 'Invalid password.' });
	}

	try {
		await user.delete();
		res.status(200).json({ message: 'User deleted successfully.' });
	} catch (error) {
		res.status(400).json(error);
	}
});

module.exports = router;

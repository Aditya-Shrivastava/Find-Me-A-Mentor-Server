const router = require('express').Router();
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const { registerValidation, loginValidation } = require('../validation');

// Signup route
router.post('/register', async (req, res) => {
	// Validate user data
	const { error } = registerValidation(req.body);
	if (error) return res.status(400).json({ error: error.details[0].message });

	// Check if email is in use
	const emailInUse = await User.findOne({ email: req.body.email });

	if (emailInUse) {
		return res
			.status(400)
			.json({ error: 'Email is already in use by another user.' });
	}

	// Hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	// Create new user
	const user = new User({
		username: req.body.username,
		email: req.body.email,
		password: hashedPassword,
		type: req.body.type,
	});

	try {
		const savedUser = await user.save();
		res.status(201).json({
			user: {
				username: savedUser.username,
				uid: savedUser._id,
				email: savedUser.email,
				type: savedUser.type,
				ratings: savedUser.ratings,
				schedule: savedUser.schedule,
			},
		});
	} catch (error) {
		res.status(400).json(error);
	}
});

// Login route
router.post('/login', async (req, res) => {
	// Validate user data
	const { error } = loginValidation(req.body);
	if (error) return res.status(400).json({ error: error.details[0].message });

	// Check if user is registered
	const registeredUser = await User.findOne({ email: req.body.email });
	if (!registeredUser) {
		return res.status(400).json({ error: 'Incorrect email or password.' });
	}

	// Validate password
	const validPassword = await bcrypt.compare(
		req.body.password,
		registeredUser.password
	);

	if (!validPassword) {
		return res.status(400).json({ error: 'Incorrect email or password.' });
	}

	res.status(200).json({
		user: {
			username: registeredUser.username,
			uid: registeredUser._id,
			email: registeredUser.email,
			type: registeredUser.type,
			ratings: registeredUser.ratings,
			schedule: registeredUser.schedule,
		},
	});
});

module.exports = router;

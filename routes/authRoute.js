const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
		type: 'mentee',
	});

	try {
		const savedUser = await user.save();

		// Create and assign token
		const token = jwt.sign(
			{
				uid: savedUser.id,
				username: savedUser.username,
				email: savedUser.email,
				type: savedUser.type,
			},
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: '12h' }
		);

		res.status(201).json({
			user: {
				username: savedUser.username,
				uid: savedUser.id,
				email: savedUser.email,
				type: savedUser.type,
				category: savedUser.category,
				ratings: savedUser.ratings,
				schedule: savedUser.schedule,
				image: savedUser.image,
				bio: savedUser.bio,
			},
			token,
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

	// Create and assign token
	const token = jwt.sign(
		{
			uid: registeredUser.id,
			username: registeredUser.username,
			email: registeredUser.email,
			type: registeredUser.type,
		},
		process.env.ACCESS_TOKEN_SECRET,
		{ expiresIn: '12h' }
	);

	res.status(200).json({
		user: {
			username: registeredUser.username,
			uid: registeredUser.id,
			email: registeredUser.email,
			type: registeredUser.type,
			ratings: registeredUser.ratings,
			schedule: registeredUser.schedule,
			category: registeredUser.category,
			image: registeredUser.image,
			bio: registeredUser.bio,
		},
		token,
	});
});

module.exports = router;

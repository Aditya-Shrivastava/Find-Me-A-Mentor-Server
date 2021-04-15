const router = require('express').Router();
const User = require('../models/User');

const { registerValidation, loginValidation } = require('../validation');

router.post('/register', async (req, res) => {
	const { error } = registerValidation(req.body);

	if (error) return res.status(400).send(error.details[0].message);

	const user = new User({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
		type: req.body.type,
	});

	try {
		const savedUser = await user.save();
		res.status(201).send({ user: savedUser });
	} catch (error) {
		res.status(400).send(error);
	}
});

module.exports = router;

const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
	const token = req.header('Authorization');
	if (!token) return res.status(401).json({ error: 'Access Denied' });

	try {
		const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
		const isValidUser = await User.findById(verified.uid);

		if (!isValidUser) {
			return res.status(404).json({ error: 'User not found.' });
		}

		req.user = verified;
		next();
	} catch (error) {
		res.status(400).json({ error: 'Invalid Token' });
	}
};

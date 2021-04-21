const User = require('../models/User');
const bcrypt = require('bcryptjs');

const fetchUserDetails = async (req, res) => {
	const uid = req.params.uid;
	const userDetails = await User.findById(uid);

	if (!userDetails) {
		return res.status(404).json({ error: 'User not found.' });
	}

	res.status(200).json({
		user: {
			username: userDetails.username,
			uid: userDetails.id,
			email: userDetails.email,
			type: userDetails.type,
			category: userDetails.category,
			ratings: userDetails.ratings,
			schedule: userDetails.schedule,
			image: userDetails.image,
			bio: userDetails.bio,
		},
	});
};

const updateUserDetails = async (req, res) => {
	const uid = req.params.uid;

	try {
		const updatedUser = await User.findByIdAndUpdate(uid, req.body, {
			new: true,
		});
		res.status(200).json({
			user: {
				username: updatedUser.username,
				uid: updatedUser.id,
				email: updatedUser.email,
				type: updatedUser.type,
				category: updatedUser.category,
				ratings: updatedUser.ratings,
				schedule: updatedUser.schedule,
				image: updatedUser.image,
				bio: updatedUser.bio,
			},
		});
	} catch (error) {
		res.status(500).json(error);
	}
};

const updateUserImage = async (req, res) => {};

const deleteUser = async (req, res) => {
	const uid = req.params.uid;
	const user = await User.findById(uid);
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
};

exports.fetchUserDetails = fetchUserDetails;
exports.updateUserDetails = updateUserDetails;
exports.updateUserImage = updateUserImage;
exports.deleteUser = deleteUser;

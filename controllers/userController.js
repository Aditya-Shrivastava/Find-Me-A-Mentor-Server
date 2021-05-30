const fs = require('fs');

const User = require('../models/User');
const bcrypt = require('bcryptjs');

const fetchUserDetails = async (req, res) => {
	const uid = req.params.uid;
	const userDetails = await User.findById(uid).lean();

	if (!userDetails) {
		return res.status(404).json({ error: 'User not found.' });
	}

	res.status(200).json({
		user: {
			username: userDetails.username,
			uid: userDetails._id,
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
		}).lean();
		res.status(200).json({
			user: {
				username: updatedUser.username,
				uid: updatedUser._id,
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

const updateUserImage = async (req, res) => {
	const uid = req.params.uid;
	const userDetails = await User.exists(uid).lean();

	if (!userDetails) {
		return res.status(404).json({ error: 'User not found.' });
	}

	if (!req.file) {
		return res
			.status(404)
			.json({ error: 'No file found, please try again.' });
	}

	const imagePath = userDetails.image;

	try {
		if (imagePath) {
			fs.unlink(imagePath, (err) => {
				console.log(err);
			});
		}

		const updatedUser = await User.findByIdAndUpdate(
			uid,
			{ image: req.file.path },
			{
				new: true,
			}
		).lean();

		res.status(200).json({
			user: {
				username: updatedUser.username,
				uid: updatedUser._id,
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

const deleteUser = async (req, res) => {
	const uid = req.params.uid;
	const user = await User.findById(uid).lean();
	const password = req.body.password;

	if (!password) {
		return res.status(400).json({ error: 'Bad Request' });
	}

	const isValidUser = bcrypt.compare(req.body.password, user.password);

	if (!isValidUser) {
		return res.status(400).json({ error: 'Invalid password.' });
	}

	const imagePath = user.image;

	try {
		if (imagePath) {
			fs.unlink(imagePath, (err) => {
				console.log(err);
			});
		}
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

const User = require('../models/User');

const fetchUserDetails = async (req, res) => {
	const uid = req.params.uid;
	if (!uid) {
		return res.status(400).json({ error: 'Bad Request' });
	}

	const userDetails = await User.findById(uid);
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
		},
	});
};

exports.fetchUserDetails = fetchUserDetails;

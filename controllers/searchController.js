const Category = require('../models/Category');

const search = async (req, res) => {
	const cname = req.query.cname;
	try {
		const response = await Category.find({
			name: { $regex: cname, $options: '$i' },
		}).lean();

		res.status(200).json({
			categories: response,
		});
	} catch (error) {
		res.status(500).json({
			error: 'Something went wrong, please try again.',
		});
	}
};

module.exports = search;

const router = require('express').Router();
const User = require('../models/User');

const fileUpload = require('../middleware/fileUpload');

// Fetch all users
router.get('/', async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json(error);
	}
});

router.post('/image', fileUpload.single('image'), (req, res) => {
	res.status(200).json({image : req.file.path});
});

module.exports = router;

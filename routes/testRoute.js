const router = require('express').Router();
const verifyToken = require('./verifyToken');

router.get('/', verifyToken, (req, res) => {
	res.json({
		user: req.user,
		posts: {
			title: 'Secret Post',
			body: 'Should not be accessed without valid auth token',
		},
	});
});

module.exports = router;

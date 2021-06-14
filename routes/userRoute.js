const router = require('express').Router();
const fileUpload = require('../middleware/fileUpload');
const {
	fetchUserDetails,
	deleteUser,
	updateUserDetails,
	updateUserImage,
} = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');

// Fetch user details
router.get('/:uid', fetchUserDetails);

// Update user details
router.patch('/:uid', verifyToken, updateUserDetails);

// Update user image
router.patch(
	'/image/:uid',
	verifyToken,
	fileUpload.single('image'),
	updateUserImage
);

// Delete user from DB
router.delete('/:uid', verifyToken, deleteUser);

module.exports = router;

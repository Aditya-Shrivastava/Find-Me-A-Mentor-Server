const router = require('express').Router();
const fileUpload = require('../middleware/fileUpload');
const {
	fetchUserDetails,
	deleteUser,
	updateUserDetails,
	updateUserImage,
} = require('../controllers/userController');

// Fetch user details
router.get('/:uid', fetchUserDetails);

// Update user details
router.patch('/:uid', updateUserDetails);

// Update user image
router.patch('/image/:uid', fileUpload.single('image'), updateUserImage);

// Delete user from DB
router.delete('/:uid', deleteUser);

module.exports = router;

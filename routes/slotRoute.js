const router = require('express').Router();
const {
	addSlot,
	fetchSlot,
	fetchUserSlots,
	deleteSlot,
	bookSlot,
} = require('../controllers/slotController');
const verifyToken = require('../middleware/verifyToken');

router.get('/', (req, res) => {
	res.send('Slots');
});

router.post('/add', verifyToken, addSlot);
router.get('/:id', fetchSlot);
router.get('/user/:uid', fetchUserSlots);
router.delete('/:id', verifyToken, deleteSlot);
router.get('/book/:id', verifyToken, bookSlot);

module.exports = router;

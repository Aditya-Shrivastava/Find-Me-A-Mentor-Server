const router = require('express').Router();
const {
	addSlot,
	fetchSlot,
	fetchMentorSlots,
	fetchMenteeSlots,
	deleteSlot,
	bookSlot,
} = require('../controllers/slotController');
const verifyToken = require('../middleware/verifyToken');

router.get('/', (req, res) => {
	res.send('Slots');
});

router.post('/add', verifyToken, addSlot);
router.get('/:id', fetchSlot);
router.get('/mentor/:uid', fetchMentorSlots);
router.get('/mentee/:uid', fetchMenteeSlots);
router.delete('/:id', verifyToken, deleteSlot);
router.get('/book/:id', verifyToken, bookSlot);

module.exports = router;

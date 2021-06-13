const router = require('express').Router();
const {
	addSlot,
	fetchSlot,
	fetchUserSlots,
	deleteSlot,
	bookSlot,
} = require('../controllers/slotController');

router.get('/', (req, res) => {
	res.send('Slots');
});

router.post('/add', addSlot);
router.get('/:id', fetchSlot);
router.get('/user/:uid', fetchUserSlots);
router.delete('/:id', deleteSlot);
router.get('/book/:id', bookSlot);

module.exports = router;

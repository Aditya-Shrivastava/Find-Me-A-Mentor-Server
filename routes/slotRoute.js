const router = require('express').Router();
const {
	addSlot,
	fetchSlot,
	deleteSlot,
	bookSlot,
} = require('../controllers/slotController');

router.get('/', (req, res) => {
	res.send('Slots');
});

router.post('/add', addSlot);
router.get('/:id', fetchSlot);
router.delete('/:id', deleteSlot);
router.put('/:id', bookSlot);

module.exports = router;

const Slot = require('../models/Slots');

const addSlot = async (req, res) => {
	const { uid } = req.user;
	const { date, time } = req.body;

	const slot = new Slot({
		date,
		time,
		creator: uid,
	});

	try {
		await slot.save();
		res.status(201).json(slot);
	} catch (error) {
		res.status(500).json({
			error: 'Failed to add new slot, please try again.',
		});
	}
};

const fetchSlot = async (req, res) => {
	const { id } = req.params;

	try {
		const slot = await Slot.findById(id).lean();
		res.status(200).json(slot);
	} catch (error) {
		res.status(500).json(error);
	}
};

const deleteSlot = async (req, res) => {
	const { id } = req.params;
	const user = req.user;
};

const bookSlot = async (req, res) => {
	const { id } = req.params;
	const user = req.user;
};

module.exports = {
	addSlot,
	fetchSlot,
	deleteSlot,
	bookSlot,
};

const mongoose = require('mongoose');
const Slot = require('../models/Slots');
const User = require('../models/User');

const addSlot = async (req, res) => {
	const { uid } = req.user;
	const { date } = req.body;

	const user = await User.findById(uid);

	if (!user) {
		return res.status(404).json({
			error: 'User not found',
		});
	}

	const slot = new Slot({
		date,
		creator: uid,
	});

	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await slot.save({ session: sess });
		user.schedule.push(slot);
		await user.save({ session: sess });
		await sess.commitTransaction();
		res.status(201).json({ slot });
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
		res.status(200).json({ slot });
	} catch (error) {
		res.status(500).json({ error });
	}
};

const fetchUserSlots = async (req, res) => {
	const { uid } = req.params;
	try {
		const slots = await Slot.find({ creator: uid }).lean();
		res.status(200).json({ slots });
	} catch (error) {
		res.status(500).json({ error });
	}
};

const deleteSlot = async (req, res) => {
	const { id } = req.params;

	const slot = await Slot.findById(id).populate('creator');
	if (!slot) {
		return res.status(404).json({ error: 'Slot does not exist' });
	}

	if (slot.booker) {
		slot = slot.populate('booker');
	}

	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await slot.remove({ session: sess });
		slot.creator.schedule.pull(slot);
		await slot.creator.save({ session: sess });
		if (slot.booker) {
			slot.booker.schedule.pull(slot);
			await slot.booker.save({ session: sess });
		}
		sess.commitTransaction();
		res.status(200).json({ message: 'Slot deleted successfully' });
	} catch (error) {
		res.status(500).json({ error });
	}
};

const bookSlot = async (req, res) => {
	const { id } = req.params;
	const { uid } = req.user;

	const slot = await Slot.findById(id);
	const user = await User.findById(uid);

	if (!slot) {
		return res.status(404).json({
			error: 'Slot not found',
		});
	}

	if (user.schedule.includes(id)) {
		return res.status(400).json({ error: 'Cannot book your own slot' });
	}

	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		slot.booker = uid;
		slot.isBooked = true;
		await slot.save({ session: sess });
		user.schedule.push(slot);
		await user.save({ session: sess });
		sess.commitTransaction();

		res.status(200).json({ message: 'Slot booked' });
	} catch (error) {
		res.status(500).json({ error });
	}
};

module.exports = {
	addSlot,
	fetchSlot,
	fetchUserSlots,
	deleteSlot,
	bookSlot,
};

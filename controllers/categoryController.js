const Category = require('../models/Category');
const User = require('../models/User');

const fetchCategories = async (req, res) => {
	const categories = await Category.find();
	res.status(200).json(categories);
};

const fetchCategoryMentors = async (req, res) => {
	const cname = req.params.cname;

	let mentors = await User.find({ category: cname }).lean();

	if (!mentors) {
		return res
			.status(404)
			.json({ error: 'No mentors found for this category.' });
	}

	res.status(200).json({
		mentors: mentors.map((mentor) => ({
			username: mentor.username,
			image: mentor.image,
			id: mentor._id,
			bio: mentor.bio,
		})),
	});
};

const addCategory = async (req, res) => {
	const category = new Category(req.body);

	try {
		await category.save();
		res.status(201).json({ message: 'New category added' });
	} catch (error) {
		res.status(400).json(error);
	}
};

const deleteCategory = async (req, res) => {
	const cid = req.params.cid;

	const category = await Category.findById(cid);
	if (!category) {
		return res.status(404).json({ error: 'Category not found.' });
	}

	try {
		await category.delete();
		res.status(200).json({ message: 'Category deleted successfully' });
	} catch (error) {
		res.status(400).json(error);
	}
};

exports.fetchCategories = fetchCategories;
exports.fetchCategoryMentors = fetchCategoryMentors;
exports.addCategory = addCategory;
exports.deleteCategory = deleteCategory;

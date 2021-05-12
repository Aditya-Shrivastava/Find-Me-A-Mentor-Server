const Joi = require('joi');

// User Registration Data Validation
const registerValidation = (data) => {
	const schema = Joi.object({
		username: Joi.string().required(),
		email: Joi.string().required().email(),
		password: Joi.string().min(6).required(),
	});

	return schema.validate(data);
};

// User Login Data Validation
const loginValidation = (data) => {
	const schema = Joi.object({
		email: Joi.string().required().email(),
		password: Joi.string().min(6).required(),
	});

	return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;

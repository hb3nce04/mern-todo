import Joi from "joi";

// Auth
const authSchema = {
	name: Joi.string().min(3).max(30).required(),
	password: Joi.string().min(6).max(30).required(),
};

export const registerSchema = Joi.object({
	...authSchema,
	email: Joi.string().email().required(),
});

export const loginSchema = Joi.object(authSchema);

// Task
export const taskSchema = Joi.object({
	priority: Joi.string().valid("low", "medium", "high").required(),
	title: Joi.string().required(),
	description: Joi.string(),
	dueDate: Joi.date().required(),
});

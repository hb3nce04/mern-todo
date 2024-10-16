import Joi from "joi";

// Auth
const authSchema = {
	email: Joi.string().email().required(),
	password: Joi.string().min(6).max(30).required(),
};
export const registerSchema = Joi.object(authSchema);
export const loginSchema = Joi.object(authSchema);

// Task
export const taskSchema = Joi.object({
	priority: Joi.string().valid("low", "medium", "high").required(),
	title: Joi.string().required(),
	description: Joi.string(),
	dueDate: Joi.date().required(),
});

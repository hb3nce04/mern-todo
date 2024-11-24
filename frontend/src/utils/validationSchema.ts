import * as Yup from "yup";

// Auth
const authSchema = {
	email: Yup.string().email().required(),
	password: Yup.string().min(6).max(30).required(),
};
export const registerSchema = Yup.object({
	...authSchema,
	password2: Yup.string().required("Invalid password"),
});
export const loginSchema = Yup.object(authSchema);

// Task
export const taskSchema = Yup.object({
	priority: Yup.string().oneOf(["low", "medium", "high"]).required(),
	title: Yup.string().required(),
	description: Yup.string(),
	dueDate: Yup.date().required(),
	completed: Yup.boolean().default(false).optional(),
});

import { NextFunction, Request, Response } from "express";
import Task from "../models/task.model";

export const getTasks = async () => {
	const tasks = await Task.find();
	return tasks;
};

export const createTask = async (
	priority: "low" | "medium" | "high",
	title: string,
	description: string,
	dueDate: Date
) => {
	const newTask = await Task.create({
		priority,
		title,
		description,
		dueDate,
	});
	return newTask;
};

// export const deleteTask = async (
// 	id: Types.ObjectId
// ): Promise<{ success: boolean; message: string }> => {
// 	const foundTask = await Task.findById(id);

// 	if (!foundTask) {
// 		return { success: false, message: "TASK_NOT_FOUND" };
// 	}
// };

export const updateTask = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {};

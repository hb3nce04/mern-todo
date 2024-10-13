import { NextFunction, Request, Response } from "express";
import Task from "../models/task.model";
import { Error, Types } from "mongoose";
import { ObjectIdExpression } from "mongoose";
import createHttpError from "http-errors";

export const getTasks = async () => {
	const tasks = await Task.find();
	return tasks;
};

// TODO - add unique check for tasks
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

// TODO - make decisions about informing user (What message to send back?)
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

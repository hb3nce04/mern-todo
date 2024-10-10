import { NextFunction, Request, Response } from "express";
import Task from "../models/user.model";
import { StatusCodes } from "http-status-codes";
import taskModel from "../models/task.model";
import { Error } from "mongoose";
import { log } from "console";

export const getTasks = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const tasks = await Task.find();
	res.send(tasks);
};

export const addTask = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { priority, title, description, dueDate } = req.body;

	const newTask = await Task.create({
		priority,
		title,
		description,
		due: dueDate,
	});

	res.send(newTask);
};

export const deleteTask = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id } = req.params;

	await taskModel
		.findByIdAndDelete(id)
		.then((ret) => {
			if (!ret) {
				res.send(StatusCodes.NOT_FOUND).json({ message: "Task is not found" });
			}
		})
		.catch((err: Error) => {
			res.send(StatusCodes.BAD_REQUEST).json({ message: "" });
		});
};

export const updateTask = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {};

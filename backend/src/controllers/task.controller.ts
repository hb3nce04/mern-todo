import { Response } from "express";
import wrapperHelper from "../helpers/wrapper.helper";
import { StatusCodes } from "http-status-codes";
import { isValidObjectId, Types } from "mongoose";
import Task from "../models/task.model";
import { UserRequest } from "../types/user.request.interface";
import { JwtPayload } from "jsonwebtoken";
import createHttpError from "http-errors";

// Get tasks by user id
export const getUserTasks = wrapperHelper(
	async (req: UserRequest, res: Response) => {
		const userId: JwtPayload = req.user.id;
		const tasks = await Task.find({ userId });
		res.status(StatusCodes.OK).json(tasks);
	}
);

// Get a task by task id for the user
export const getUserTaskById = wrapperHelper(
	async (req: UserRequest, res: Response) => {
		const { id } = req.params;
		if (!isValidObjectId(id)) {
			return res.sendStatus(StatusCodes.BAD_REQUEST);
		}
		const objectId = new Types.ObjectId(id);
		const userId: JwtPayload = req.user.id;
		const task = await Task.findOne({ _id: objectId, userId });
		if (!task) {
			throw createHttpError(StatusCodes.NOT_FOUND, "Task not found");
		}
		res.status(StatusCodes.OK).json(task);
	}
);

// Create a new task for the user
export const createUserTask = wrapperHelper(
	async (req: UserRequest, res: Response) => {
		const { priority, title, description, dueDate } = req.body;
		const userId: JwtPayload = req.user.id;
		const createdTask = await Task.create({
			priority,
			title,
			description,
			dueDate,
			userId,
		});
		res.status(StatusCodes.OK).send(createdTask);
	}
);

// Delete a task by id for the user
export const deleteUserTask = wrapperHelper(
	async (req: UserRequest, res: Response) => {
		const { id } = req.params;
		if (!isValidObjectId(id)) {
			return res.sendStatus(StatusCodes.BAD_REQUEST);
		}
		const objectId = new Types.ObjectId(id);
		const userId: JwtPayload = req.user.id;
		const deletedTask = await Task.findOneAndDelete({ _id: objectId, userId });
		if (!deletedTask) {
			throw createHttpError(StatusCodes.NOT_FOUND, "Task not found");
		}
		res
			.status(StatusCodes.OK)
			.json({ message: "Task deleted successfully", data: deletedTask });
	}
);

// Update the whole (PUT) a task by id for the user
export const updateUserTask = wrapperHelper(
	async (req: UserRequest, res: Response) => {
		const { id } = req.params;
		if (!isValidObjectId(id)) {
			return res.sendStatus(StatusCodes.BAD_REQUEST);
		}
		const objectId = new Types.ObjectId(id);
		const userId: JwtPayload = req.user.id;
		const { priority, title, description, dueDate } = req.body;
		const updatedTask = await Task.findOneAndUpdate(
			{ _id: objectId, userId },
			{
				priority,
				title,
				description,
				dueDate,
				userId,
			},
			{ new: true }
		);
		if (!updatedTask) {
			throw createHttpError(StatusCodes.NOT_FOUND, "Task not found");
		}
		res
			.status(StatusCodes.OK)
			.json({ message: "Task updated successfully", data: updatedTask });
	}
);

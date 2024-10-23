import { Response } from "express";
import { UserRequest, wrapperHelper, validateObjectId } from "../utils";
import { StatusCodes } from "http-status-codes";
import createHttpError from "http-errors";
import {
	createTask,
	deleteTask,
	getTask,
	getTasks,
	updateTask,
} from "../services/task.service";
import { ITask } from "../models/task.model";

export const createMyTask = wrapperHelper(
	async (req: UserRequest, res: Response) => {
		const { priority, title, description, dueDate } = req.body;
		const userId: string = req.user.id;
		const createdTask: ITask = await createTask({
			userId,
			priority,
			title,
			description,
			dueDate: new Date(dueDate),
		});
		res.status(StatusCodes.CREATED).send(createdTask);
	}
);

export const getMyTasks = wrapperHelper(
	async (req: UserRequest, res: Response) => {
		const userId: string = req.user.id;
		const tasks = await getTasks(userId);
		res.status(StatusCodes.OK).json(tasks);
	}
);

export const getMyTaskById = wrapperHelper(
	async (req: UserRequest, res: Response) => {
		const { id } = req.params;
		if (!validateObjectId(id)) {
			throw createHttpError.BadRequest("Invalid ObjectId");
		}
		const userId: string = req.user.id;
		const task = await getTask(userId, id);
		if (!task) {
			throw createHttpError(StatusCodes.NOT_FOUND, "Task not found");
		}
		res.status(StatusCodes.OK).json(task);
	}
);

// TODO: PATCH METHOD!
export const updateMyTask = wrapperHelper(
	async (req: UserRequest, res: Response) => {
		const { id } = req.params;
		if (!validateObjectId(id)) {
			throw createHttpError.BadRequest("Invalid ObjectId");
		}
		const userId: string = req.user.id;
		const { priority, title, description, dueDate } = req.body;
		const updatedTask = await updateTask(userId, id, {
			userId,
			priority,
			title,
			description,
			dueDate: new Date(dueDate),
		});
		if (!updatedTask) {
			throw createHttpError(StatusCodes.NOT_FOUND, "Task not found");
		}
		res
			.status(StatusCodes.OK)
			.json({ message: "Task updated successfully", data: updatedTask });
	}
);

export const deleteMyTask = wrapperHelper(
	async (req: UserRequest, res: Response) => {
		const { id } = req.params;
		if (!validateObjectId(id)) {
			throw createHttpError.BadRequest("Invalid ObjectId");
		}
		const userId: string = req.user.id;
		const deletedTask = await deleteTask(userId, id);
		if (!deletedTask) {
			throw createHttpError(StatusCodes.NOT_FOUND, "Task not found");
		}
		res
			.status(StatusCodes.OK)
			.json({ message: "Task deleted successfully", data: deletedTask });
	}
);

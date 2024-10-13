import { NextFunction, Request, Response } from "express";
import wrapperHelper from "../helpers/wrapper.helper";
import {
	createTask,
	getTasks as getTasksService,
	//deleteTask as deleteTaskService,
} from "../services/task.service";
import { StatusCodes } from "http-status-codes";
import { isValidObjectId, Types } from "mongoose";

export const getTasks = wrapperHelper(
	async (req: Request, res: Response, next: NextFunction) => {
		const tasks = await getTasksService();
		res.status(StatusCodes.OK).json(tasks);
	}
);

export const addTask = wrapperHelper(
	async (req: Request, res: Response, next: NextFunction) => {
		const { priority, title, description, dueDate } = req.body;
		const newTask = await createTask(priority, title, description, dueDate);
		res.status(StatusCodes.OK).json(newTask);
	}
);

export const deleteTask = wrapperHelper(
	async (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;

		if (!isValidObjectId(id)) {
			return res.sendStatus(StatusCodes.BAD_REQUEST);
		}

		const objectId = new Types.ObjectId(id);

		//const result = await deleteTaskService(objectId);

		console.log(objectId);
	}
);

export const updateTask = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {};

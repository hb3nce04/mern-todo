import Task, { ITask } from "../models/task.model";
import { validateAndConvertObjectId } from "../utils/objectid.util";

export const createTask = async (task: ITask): Promise<any> => {
	return await Task.create(task);
};

export const getTasks = async (
	userId?: string,
	taskId?: string
): Promise<ITask[] | null> => {
	if (userId && !taskId) {
		return await Task.find({ userId });
	}
	if (!userId && taskId) {
		return await Task.find({ _id: validateAndConvertObjectId(taskId) });
	}
	if (userId && taskId) {
		return await Task.find({
			userId,
			_id: validateAndConvertObjectId(taskId),
		});
	}
	return null;
};

export const getTask = async (
	userId?: string,
	taskId?: string
): Promise<ITask | null> => {
	if (userId && !taskId) {
		return await Task.findOne({ userId });
	}
	if (!userId && taskId) {
		return await Task.findOne({ _id: validateAndConvertObjectId(taskId) });
	}
	if (userId && taskId) {
		return await Task.findOne({
			userId,
			_id: validateAndConvertObjectId(taskId),
		});
	}
	return null;
};

export const updateTask = async (
	userId: string,
	taskId: string,
	task: ITask
): Promise<ITask | null> => {
	return await Task.findOneAndUpdate(
		{ userId, _id: validateAndConvertObjectId(taskId) },
		task,
		{
			new: true,
		}
	);
};

export const deleteTask = async (
	userId: string,
	taskId: string
): Promise<ITask | null> => {
	return await Task.findOneAndDelete({
		userId,
		_id: validateAndConvertObjectId(taskId),
	});
};

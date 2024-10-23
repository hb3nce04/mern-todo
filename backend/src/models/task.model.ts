import { Schema, Types, model } from "mongoose";

export interface ITask {
	userId: Types.ObjectId | string;
	folderId?: Types.ObjectId | string;
	priority: "low" | "medium" | "high";
	title: string;
	description?: string;
	completed?: boolean | false;
	dueDate: Date;
}

const schema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		folderId: {
			type: Schema.Types.ObjectId,
			ref: "Folder",
		},
		priority: {
			type: String,
			enum: ["low", "medium", "high"],
			required: true,
		},
		title: { type: String, required: true },
		description: { type: String },
		completed: { type: Boolean, default: false },
		dueDate: { type: Date, required: true },
	},
	{ timestamps: true }
);

const Task = model("Task", schema);

export default Task;

import { Schema, model } from "mongoose";

const taskSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
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

const Task = model("Task", taskSchema);

export default Task;

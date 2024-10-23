import { model, Schema, Types } from "mongoose";

export interface IFolder {
	userId: Types.ObjectId | string;
	name: string;
	description?: string;
	parentFolderId?: string;
}

// TODO: shared folder with other users
const schema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		name: { type: String, required: true },
		description: { type: String },
		parentFolderId: {
			type: Schema.Types.ObjectId,
			ref: "Folder",
		},
	},
	{ timestamps: true }
);

const Folder = model<IFolder>("Folder", schema);

export default Folder;

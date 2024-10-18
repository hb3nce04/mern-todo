import { Schema, model } from "mongoose";

const userSchema = new Schema(
	{
		email: { type: String, unique: true },
		password: { type: String },
		googleId: { type: String, unique: true },
		name: { type: String },
		picture: { type: String },
	},
	{ timestamps: true }
);

const User = model("User", userSchema);

export default User;

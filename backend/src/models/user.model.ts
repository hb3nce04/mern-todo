import { Schema, model } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new Schema({
	name: { type: String, required: true },
	password: { type: String, required: true },
	email: { type: String, required: true },
});

userSchema.plugin(passportLocalMongoose);

const User = model("User", userSchema);

export default User;

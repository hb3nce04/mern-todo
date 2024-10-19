import { compare, hash } from "bcrypt";
import { Model, Schema, model } from "mongoose";

interface IUser {
	methods: string[];
	local?: {
		email: string;
		password: string;
	};
	google?: {
		id: string;
		email: string;
	};
	name: string;
	picture: string;
}
interface IUserMethods {
	isValidPassword(password: string): Promise<boolean>;
}
type UserModel = Model<IUser, object, IUserMethods>;

const schema = new Schema<IUser, UserModel, IUserMethods>(
	{
		methods: {
			type: [String],
			enum: ["local", "google"],
			default: ["local"],
			required: true,
		},
		local: {
			email: {
				type: String,
				lowercase: true,
			},
			password: {
				type: String,
			},
		},
		google: {
			id: {
				type: String,
			},
			email: {
				type: String,
				lowercase: true,
			},
		},
		name: { type: String },
		picture: { type: String },
	},
	{ timestamps: true }
);

schema.methods.isValidPassword = async function (password: string) {
	if (this.methods.includes("local")) {
		return await compare(
			password + process.env.PASSWORD_SALT,
			this.local!.password
		);
	}
	return false;
};

schema.pre("save", async function (next) {
	if (!this.methods.includes("local")) {
		next();
	}
	if (!this.isModified("local.password")) {
		next();
	}
	const hashedPassword = await hash(
		this.local!.password + process.env.PASSWORD_SALT,
		12
	);
	this.local!.password = hashedPassword;
	next();
});

const User = model<IUser, UserModel>("User", schema);

export default User;

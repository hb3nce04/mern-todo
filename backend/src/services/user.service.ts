import User, { IUser } from "../models/user.model";

/**
 * Finds a user by their local email.
 * @param email - The local email of the user.
 * @returns The user document if found, otherwise null.
 */
export const findUserByLocalEmail = async (email: string): Promise<any> => {
	// We could'nt use interface IUser because of mongoose methods like .save()
	return await User.findOne({ "local.email": email });
};

/**
 * Finds a user by their Google ID.
 * @param googleId - The Google ID of the user.
 * @returns The user document if found, otherwise null.
 */
export const findUserByGoogleId = async (googleId: string): Promise<any> => {
	return await User.findOne({ "google.id": googleId });
};

/**
 * Finds a user by their local email or Google email.
 * @param email - The email of the user.
 * @returns The user document if found, otherwise null.
 */
export const findUserByEmail = async (email: string): Promise<any> => {
	return await User.findOne({
		$or: [{ "local.email": email }, { "google.email": email }],
	});
};

// TODO: RETURNING
export const createUser = async (email: string, password: string) => {
	await User.create({
		methods: ["local"],
		local: {
			email,
			password,
		},
	});
};

export const deleteUserById = async (id: string): Promise<IUser | null> => {
	return await User.findByIdAndDelete(id);
};

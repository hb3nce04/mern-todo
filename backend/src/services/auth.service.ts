import { Request, Response } from "express";
import { compare, hash } from "bcrypt";
import User from "../models/user.model";
import { sign } from "jsonwebtoken";

export const createUser = async (
	name: string,
	password: string,
	email: string
): Promise<{ success: boolean; message: string }> => {
	const foundUser = await User.findOne({ name });
	if (foundUser) {
		return { success: false, message: "USERNAME_EXISTS" };
	}

	const foundEmail = await User.findOne({ email });
	if (foundEmail) {
		return { success: false, message: "EMAIL_EXISTS" };
	}

	const passwordHash = await hash(password + process.env.PASSWORD_SALT, 12);

	await User.create({
		name,
		email,
		password: passwordHash,
	});

	return { success: true, message: "USER_CREATED" };
};

export const authUser = async (
	name: string,
	password: string
): Promise<{ success: boolean; message: string; token?: string }> => {
	const foundUser = await User.findOne({ name });

	if (!foundUser) {
		return { success: false, message: "INVALID_CREDENTIALS" };
	}

	const validPassword = await compare(
		password + process.env.PASSWORD_SALT,
		foundUser.password
	);

	if (!validPassword) {
		return { success: false, message: "INVALID_CREDENTIALS" };
	}

	const token = sign(
		{ id: foundUser.id, name: foundUser.name, email: foundUser.email },
		process.env.JWT_SECRET || "",
		{ expiresIn: process.env.JWT_LIFETIME }
	);

	return { success: true, message: "AUTHENTICATED", token };
};

export const logoutUser = async (req: Request, res: Response) => {};
export const refreshToken = async (req: Request, res: Response) => {};
export const verifyUser = async (req: Request, res: Response) => {};
export const forgotPassword = async (req: Request, res: Response) => {};
export const resetPassword = async (req: Request, res: Response) => {};
export const changePassword = async (req: Request, res: Response) => {};
export const changeEmail = async (req: Request, res: Response) => {};
export const deleteUser = async (req: Request, res: Response) => {};
export const getUser = async (req: Request, res: Response) => {};
export const getUsers = async (req: Request, res: Response) => {};
export const updateUser = async (req: Request, res: Response) => {};
export const updateMe = async (req: Request, res: Response) => {};
export const deleteMe = async (req: Request, res: Response) => {};
export const getMe = async (req: Request, res: Response) => {};
export const uploadAvatar = async (req: Request, res: Response) => {};
export const deleteAvatar = async (req: Request, res: Response) => {};
export const verifyEmail = async (req: Request, res: Response) => {};
export const resendVerificationEmail = async (
	req: Request,
	res: Response
) => {};
export const sendPasswordResetEmail = async (req: Request, res: Response) => {};
export const sendEmailChangeEmail = async (req: Request, res: Response) => {};
export const sendEmailChangeVerificationEmail = async (
	req: Request,
	res: Response
) => {};

import createHttpError from "http-errors";
import { wrapperHelper } from "../helpers/wrapper.helper";
import { hash } from "bcrypt";
import User from "../models/user.model";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

export const createUser = wrapperHelper(async (req: Request, res: Response) => {
	const { email, password } = req.body;

	const existingUserByEmail = await User.findOne({ email });
	if (existingUserByEmail) {
		throw createHttpError.Conflict(
			"Email already exists. Please use another email"
		);
	}

	const hashedPassword = await hash(password + process.env.PASSWORD_SALT, 12);

	await User.create({
		email,
		password: hashedPassword,
	});

	res.status(StatusCodes.CREATED).json({ message: "Successfully registered" });
});

// export const forgotPassword = async (req: Request, res: Response) => {};
// export const resetPassword = async (req: Request, res: Response) => {};
// export const changePassword = async (req: Request, res: Response) => {};
// export const changeEmail = async (req: Request, res: Response) => {};
// export const deleteUser = async (req: Request, res: Response) => {};
// export const getUser = async (req: Request, res: Response) => {};
// export const getUsers = async (req: Request, res: Response) => {};
// export const updateUser = async (req: Request, res: Response) => {};
// export const updateMe = async (req: Request, res: Response) => {};
// export const deleteMe = async (req: Request, res: Response) => {};
// export const getMe = async (req: Request, res: Response) => {};
// export const uploadAvatar = async (req: Request, res: Response) => {};
// export const deleteAvatar = async (req: Request, res: Response) => {};
// export const verifyEmail = async (req: Request, res: Response) => {};
// export const resendVerificationEmail = async (
// 	req: Request,
// 	res: Response
// ) => {};
// export const sendPasswordResetEmail = async (req: Request, res: Response) => {};
// export const sendEmailChangeEmail = async (req: Request, res: Response) => {};
// export const sendEmailChangeVerificationEmail = async (
// 	req: Request,
// 	res: Response
// ) => {};

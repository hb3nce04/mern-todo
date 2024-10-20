import createHttpError from "http-errors";
import { wrapperHelper } from "../helpers/wrapper.helper";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import {
	findUserByEmail,
	createUser as createUserService,
} from "../services/user.service";

interface CreateUserRequest extends Request {
	body: {
		email: string;
		password: string;
	};
}

export const createUser = wrapperHelper(
	async (req: CreateUserRequest, res: Response) => {
		const { email, password } = req.body;

		const existingUser = await findUserByEmail(email);
		if (existingUser) {
			if (existingUser.methods.includes("local")) {
				throw createHttpError.Conflict(
					"Email already exists. Please use another email"
				);
			} else {
				existingUser.methods.push("local");
				existingUser.local = {
					email,
					password,
				};
				await existingUser.save();
				res.status(StatusCodes.CREATED).json({
					message:
						"We've found a Google account with that e-mail address. Successfully registered and merged!",
				});
			}
		} else {
			await createUserService(email, password);

			res
				.status(StatusCodes.CREATED)
				.json({ message: "Successfully registered" });
		}
	}
);

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

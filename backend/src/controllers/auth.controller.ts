import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import wrapperHelper from "../helpers/wrapper.helper";
import { StatusCodes } from "http-status-codes";
import User from "../models/user.model";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";

export const registerUser = wrapperHelper(
	async (req: Request, res: Response) => {
		const { email, password } = req.body;

		const existingUserByEmail = await User.findOne({ email });
		if (existingUserByEmail) {
			throw new createHttpError.Conflict(
				"Email already exists. Please use another email"
			);
		}

		const hashedPassword = await hash(password + process.env.PASSWORD_SALT, 12);

		await User.create({
			email,
			password: hashedPassword,
		});

		res
			.status(StatusCodes.CREATED)
			.json({ message: "Successfully registered" });
	}
);

export const authenticateUser = wrapperHelper(
	async (req: Request, res: Response, next: NextFunction) => {
		const { email, password } = req.body;

		const existingUser = await User.findOne({ email });

		if (!existingUser) {
			throw createHttpError.Unauthorized(
				"Unauthorized access. Please check your credentials"
			);
		}

		const isPasswordValid = await compare(
			password + process.env.PASSWORD_SALT,
			existingUser.password
		);

		if (!isPasswordValid) {
			throw createHttpError.Unauthorized(
				"Unauthorized access. Please check your credentials"
			);
		}

		const token = sign({ id: existingUser.id }, process.env.JWT_SECRET || "", {
			expiresIn: process.env.JWT_LIFETIME,
		});

		// TODO
		res
			.cookie("token", token, {
				maxAge: parseInt(process.env.COOKIE_MAX_AGE || "0"),
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "strict",
			})
			.status(StatusCodes.OK)
			.json({
				message: "Logged in successfully",
				user: { id: existingUser.id, email: existingUser.email },
			});
	}
);

// export const logoutUser = async (req: Request, res: Response) => {};
// export const refreshToken = async (req: Request, res: Response) => {};
// export const verifyUser = async (req: Request, res: Response) => {};
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

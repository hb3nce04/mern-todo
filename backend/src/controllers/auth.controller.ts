import { Request, Response } from "express";
import createHttpError from "http-errors";
import wrapperHelper from "../helpers/wrapper.helper";
import { StatusCodes } from "http-status-codes";
import User from "../models/user.model";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { OAuth2Client, TokenPayload } from "google-auth-library";

const client = new OAuth2Client(
	process.env.GOOGLE_CLIENT_ID,
	process.env.GOOGLE_CLIENT_SECRET,
	"http://localhost:3000/api/auth/google/callback"
);

export const registerUser = wrapperHelper(
	async (req: Request, res: Response) => {
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

		res
			.status(StatusCodes.CREATED)
			.json({ message: "Successfully registered" });
	}
);

export const authenticateUser = wrapperHelper(
	async (req: Request, res: Response) => {
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

export const handleGoogleAuth = wrapperHelper(
	async (req: Request, res: Response) => {
		const authorizationUrl = client.generateAuthUrl({
			access_type: "offline",
			scope: ["profile", "email"], // "email"?
			state: "your_state_value", // Optional state parameter for CSRF protection
			prompt: "select_account",
		});

		res.send({ url: authorizationUrl });
	}
);

export const handleGoogleCallback = wrapperHelper(
	async (req: Request, res: Response) => {
		const code = req.query.code;

		if (!code || typeof code !== "string") {
			throw createHttpError.Unauthorized("Invalid token");
		}

		// Exchange the authorization code for an access token
		const { tokens } = await client.getToken(code);

		if (!tokens) {
			throw createHttpError.Unauthorized("Invalid token");
		}

		// Verify the token and get user information
		const ticket = await client.verifyIdToken({
			idToken: tokens.id_token!,
			audience: process.env.GOOGLE_CLIENT_ID,
		});

		if (!ticket) {
			throw createHttpError.Unauthorized("Invalid ticket");
		}

		const payload = ticket.getPayload();

		res.send("<h1>Successful login!</h1>");

		// const user = await User.findOne({ googleId });

		// if (!user) {
		// }
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

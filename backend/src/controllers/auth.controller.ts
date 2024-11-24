import { Request, Response } from "express";
import createHttpError from "http-errors";
import { wrapperHelper, COOKIE_OPTIONS, createJWTToken } from "../utils";
import { StatusCodes } from "http-status-codes";
import User from "../models/user.model";
import { OAuth2Client, TokenPayload } from "google-auth-library";
import {
	findUserByGoogleId,
	findUserByLocalEmail,
} from "../services/user.service";

const client = new OAuth2Client(
	process.env.GOOGLE_CLIENT_ID,
	process.env.GOOGLE_CLIENT_SECRET,
	"http://localhost:3000/api/auth/google/callback"
);

export const handleLocalAuth = wrapperHelper(
	async (req: Request, res: Response) => {
		const { email, password } = req.body;

		const existingUser = await findUserByLocalEmail(email);

		if (!existingUser) {
			throw createHttpError.Unauthorized("Invalid credentials!");
		}

		const isPasswordValid = await existingUser.isValidPassword(password);

		if (!isPasswordValid) {
			throw createHttpError.Unauthorized("Invalid credentials!");
		}

		res
			.cookie("token", createJWTToken(existingUser), COOKIE_OPTIONS)
			.status(StatusCodes.OK)
			.json({
				message: "Logged in successfully",
				user: { id: existingUser.id, email: existingUser.local!.email }, // TODO
			});
	}
);

export const handleGoogleAuth = wrapperHelper(
	async (req: Request, res: Response) => {
		const authorizationUrl = client.generateAuthUrl({
			access_type: "offline",
			scope: ["profile", "email"],
			state: "MYCSRFPROTECTION",
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

		const { sub: googleId, email } = ticket.getPayload() as TokenPayload;

		let existingUser = await findUserByGoogleId(googleId);

		if (!existingUser) {
			existingUser = await User.findOne({
				"local.email": email,
			});
			if (existingUser) {
				existingUser.methods.push("google");
				existingUser.google = {
					id: googleId,
					email: email!,
				};
				await existingUser.save();
			} else {
				existingUser = await User.create({
					methods: ["google"],
					google: {
						id: googleId,
						email: email!,
					},
				});
			}
		}

		res
			.cookie("token", createJWTToken(existingUser), COOKIE_OPTIONS)
			.status(StatusCodes.OK)
			.json({
				message: "Logged in successfully",
				user: { id: existingUser.id, email: existingUser.local!.email }, // TODO
			})
			.redirect(process.env.FRONTEND_URL!);
	}
);

export const handleLogout = (req: Request, res: Response) => {
	res
		.clearCookie("token")
		.status(StatusCodes.OK)
		.json({ message: "Logged out successfully" });
};

// export const refreshToken = async (req: Request, res: Response) => {};
// export const verifyUser = async (req: Request, res: Response) => {};

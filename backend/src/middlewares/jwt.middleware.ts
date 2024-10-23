import { Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { UserRequest, wrapperHelper } from "../utils";
import { JwtPayload, verify } from "jsonwebtoken";
import User from "../models/user.model";

export const verifyJwtToken = wrapperHelper(
	async (req: UserRequest, res: Response, next: NextFunction) => {
		const cookie = req.cookies.token;

		if (!cookie) {
			throw createHttpError.Unauthorized("Token not found");
		}

		const decoded = (await verify(
			cookie,
			process.env.JWT_SECRET ?? ""
		)) as JwtPayload;
		if (!decoded) {
			throw createHttpError.Unauthorized("Invalid token");
		}

		// TODO + WITH CACHING
		const user = await User.findById({
			_id: decoded.id,
		});
		if (!user) {
			throw createHttpError.Unauthorized("User not found");
		}

		// TODO: return with the necceassry user data
		req.user = user;
		next();
	}
);

export const verifyNotJwtToken = wrapperHelper(
	async (req: UserRequest, res: Response, next: NextFunction) => {
		const cookie = req.cookies.token;

		// TODO: maybe we should check whether the token is valid or not
		if (cookie) {
			throw createHttpError.Forbidden("You've already authorized!");
		}

		next();
	}
);

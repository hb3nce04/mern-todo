import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import User from "../models/user.model";
import wrapperHelper from "../helpers/wrapper.helper";
import { JwtPayload, verify } from "jsonwebtoken";
import { Types } from "mongoose";

export default wrapperHelper(
	async (req: Request, res: Response, next: NextFunction) => {
		const { authorization } = req.headers;
		const token = authorization?.split(" ")[1];

		if (!authorization || !token) {
			return next(createHttpError.Unauthorized());
		}

		const payload = (await verify(
			token,
			process.env.JWT_SECRET || ""
		)) as JwtPayload;
		if (!payload) {
			throw createHttpError.Unauthorized("Invalid token");
		}

		const user = await User.findById({
			_id: payload.id,
			name: payload.name,
			email: payload.email,
		});
		if (!user) {
			return next(createHttpError.Unauthorized("User not found"));
		}

		next();
	}
);

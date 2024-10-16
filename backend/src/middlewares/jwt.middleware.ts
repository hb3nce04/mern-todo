import { Response, NextFunction } from "express";
import createHttpError from "http-errors";
import wrapperHelper from "../helpers/wrapper.helper";
import { JwtPayload, verify } from "jsonwebtoken";
import { UserRequest } from "../types/user-request.interface";

export default wrapperHelper(
	async (req: UserRequest, res: Response, next: NextFunction) => {
		const cookie = req.cookies.token;

		if (!cookie) {
			throw createHttpError.Unauthorized("Token not found");
		}

		const decoded = (await verify(
			cookie,
			process.env.JWT_SECRET || ""
		)) as JwtPayload;
		if (!decoded) {
			throw createHttpError.Unauthorized("Invalid token");
		}

		// TODO + WITH CACHING
		// const user = await User.findById({
		// 	_id: decoded.id,
		// });
		// if (!user) {
		// 	throw createHttpError.Unauthorized("User not found");
		// }

		req.user = decoded;
		next();
	}
);

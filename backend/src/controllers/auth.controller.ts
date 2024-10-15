import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { getLocalizedText } from "../helpers/locale.helper";
import wrapperHelper from "../helpers/wrapper.helper";
import { createUser, authUser } from "../services/auth.service";
import { StatusCodes } from "http-status-codes";

export const registerUser = wrapperHelper(
	async (req: Request, res: Response): Promise<any> => {
		const { name, password, email } = req.body;

		const createdUser: { success: boolean; message: string } = await createUser(
			name,
			password,
			email
		);

		if (!createdUser.success) {
			throw createHttpError.Conflict(
				getLocalizedText(req, "auth", createdUser.message)
			);
		}

		res
			.status(StatusCodes.CREATED)
			.json({ message: getLocalizedText(req, "auth", createdUser.message) });
	}
);

export const authenticateUser = wrapperHelper(
	async (req: Request, res: Response, next: NextFunction) => {
		const { name, password } = req.body;

		const { success, message, token } = await authUser(name, password);

		if (!success) {
			throw createHttpError.Unauthorized(
				getLocalizedText(req, "auth", message)
			);
		}

		res
			.status(StatusCodes.OK)
			.json({ message: getLocalizedText(req, "auth", message), token });
	}
);

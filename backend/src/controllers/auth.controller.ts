import { Request, Response } from "express";
import createHttpError from "http-errors";
import { _ } from "../helpers/locale.helper";
import wrapperHelper from "../helpers/wrapper.helper";
import { createUser } from "../services/auth.service";
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
			throw createHttpError.Conflict(_(req, "auth", createdUser.message));
		}

		res
			.status(StatusCodes.CREATED)
			.json({ message: _(req, "auth", createdUser.message) });
	}
);

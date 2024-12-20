import { NextFunction, Request, Response } from "express";
import { wrapperHelper } from "../utils";
import createHttpError from "http-errors";
import Joi from "joi";

export const validationMiddleware = (schema: Joi.Schema) => {
	return wrapperHelper(
		async (req: Request, res: Response, next: NextFunction) => {
			await schema
				.validateAsync(req.body)
				.then(() => next())
				.catch((err: any) => {
					//res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
					throw createHttpError.BadRequest(err.message);
				});
		}
	);
};

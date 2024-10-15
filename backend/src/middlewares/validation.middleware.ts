import { NextFunction, Request, Response } from "express";
import wrapperHelper from "../helpers/wrapper.helper";
import createHttpError from "http-errors";
import Joi from "joi";

export default (schema: Joi.Schema) => {
	return wrapperHelper(
		async (req: Request, res: Response, next: NextFunction) => {
			await schema
				.validateAsync(req.body)
				.then(() => next())
				.catch((err: any) => {
					//res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
					throw new createHttpError.BadRequest(err.message);
				});
		}
	);
};

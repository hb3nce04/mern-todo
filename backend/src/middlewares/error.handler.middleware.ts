import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export const errorHandler = (
	err: HttpError | Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const code =
		err instanceof HttpError
			? err.statusCode
			: StatusCodes.INTERNAL_SERVER_ERROR;
	const message =
		err instanceof HttpError
			? err.message
			: ReasonPhrases.INTERNAL_SERVER_ERROR;

	if (!(err instanceof HttpError)) {
		if (process.env.NODE_ENV === "development") {
			console.error(err.stack);
		} else {
			console.error(`${err.name}: ${err.message}`);
		}
	}

	res.status(code).json({ message });
};

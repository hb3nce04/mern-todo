import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export default (
	err: HttpError | Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res
		.status(
			err instanceof HttpError
				? err.statusCode
				: StatusCodes.INTERNAL_SERVER_ERROR
		)
		.json({
			message:
				err instanceof HttpError
					? err.message
					: ReasonPhrases.INTERNAL_SERVER_ERROR,
		});
	if (!(err instanceof HttpError)) {
		if (process.env.NODE_ENV === "development") {
			console.error(err.stack);
		} else {
			console.error(`${err.name}: ${err.message}`);
		}
	}
};

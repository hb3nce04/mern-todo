import { Types } from "mongoose";
import createHttpError from "http-errors";

/**
 * Validates and converts a string to a MongoDB ObjectId.
 * @param id - The string to validate and convert.
 * @returns The converted ObjectId if valid, otherwise throws an error.
 */
export const validateAndConvertObjectId = (id: string): Types.ObjectId => {
	if (!Types.ObjectId.isValid(id)) {
		throw createHttpError.BadRequest("Invalid ObjectId");
	}
	return new Types.ObjectId(id);
};

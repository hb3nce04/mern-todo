import { NextFunction, Request, Response } from "express";
import { JwtPayload, sign } from "jsonwebtoken";
import { Types } from "mongoose";
import Joi from "joi";

/**
 * Interface extending Request that contains JWT user payload
 */
export interface UserRequest extends Request {
	user: JwtPayload;
}

/**
 * Wrapper function to catch errors in async functions
 */
export const wrapperHelper = (fn: any) => {
	return (req: Request, res: Response, next: NextFunction) => {
		Promise.resolve(fn(req, res, next)).catch(next);
	};
};

/**
 * Constant to create global cookie options
 */
export const COOKIE_OPTIONS = {
	maxAge: parseInt(process.env.COOKIE_MAX_AGE ?? "0"),
	httpOnly: true,
	secure: process.env.NODE_ENV === "production",
	sameSite: true,
};

/**
 * Global function to create JWT token
 */
export const createJWTToken = (user: any): string => {
	return sign({ iss: "hb3nce04", id: user._id }, process.env.JWT_SECRET ?? "", {
		expiresIn: process.env.JWT_LIFETIME,
	});
};

/**
 * Validates a string against MongoDB ObjectId.
 * @param id - The string to validate.
 * @returns The converted whether ObjectId is valid
 */
export const validateObjectId = (id: string): boolean => {
	return Types.ObjectId.isValid(id);
};

/**
 * Converts a string to MongoDB ObjectId.
 * @param id - The string to convert.
 * @returns The converted ObjectId
 */
export const convertObjectId = (id: string): Types.ObjectId => {
	return new Types.ObjectId(id);
};

// Validation for Joi
const authSchema = {
	email: Joi.string().email().required(),
	password: Joi.string().min(6).max(30).required(),
};
export const registerSchema = Joi.object(authSchema);
export const loginSchema = Joi.object(authSchema);
export const taskSchema = Joi.object({
	priority: Joi.string().valid("low", "medium", "high").required(),
	title: Joi.string().required(),
	description: Joi.string(),
	dueDate: Joi.date().required(),
	completed: Joi.boolean().default(false).optional(),
});

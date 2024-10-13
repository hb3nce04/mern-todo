import express, { NextFunction, Request, Response } from "express";
import { registerUser } from "../controllers/auth.controller";
import { StatusCodes } from "http-status-codes";
import { registerSchema } from "../utils/validation.util";
import wrapperUtil from "../helpers/wrapper.helper";
import createHttpError from "http-errors";
import validationMiddleware from "../middlewares/validation.middleware";
import User from "../models/user.model";

const router = express.Router();

//router.post("/signin");

router.get("/", async (req: Request, res: Response) => {
	res.send(await User.find());
});
router.post("/register", validationMiddleware(registerSchema), registerUser);

export default router;

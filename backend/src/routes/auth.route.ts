import express, { Request, Response } from "express";
import { registerUser, signInUser } from "../controllers/auth.controller";
import { loginSchema, registerSchema } from "../utils/validation.util";
import validationMiddleware from "../middlewares/validation.middleware";
import User from "../models/user.model";
import passport from "passport";
import wrapperHelper from "../helpers/wrapper.helper";

const router = express.Router();

//router.post("/signin");

router.get(
	"/",
	wrapperHelper(async (req: Request, res: Response) => {
		res.send(await User.find());
	})
);
router.post("/register", validationMiddleware(registerSchema), registerUser);
router.post(
	"/login",
	validationMiddleware(loginSchema),
	passport.authenticate("local", { session: false }),
	signInUser
);

export default router;

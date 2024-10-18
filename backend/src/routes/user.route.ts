import { createUser } from "../controllers/user.controller";
import { Router } from "express";
import {validationMiddleware} from "../middlewares/validation.middleware";
import { registerSchema } from "../utils/validation.util";
import { verifyNotJwtToken } from "../middlewares/jwt.middleware";

const router = Router();

router.post(
	"/",
	verifyNotJwtToken,
	validationMiddleware(registerSchema),
	createUser
);

export default router;

import { createUser, deleteMe } from "../controllers/user.controller";
import { Router } from "express";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { registerSchema } from "../utils";
import { verifyNotJwtToken } from "../middlewares/jwt.middleware";

const router = Router();

router.post(
	"/",
	verifyNotJwtToken,
	validationMiddleware(registerSchema),
	createUser
);
router.delete("/", verifyNotJwtToken, deleteMe);

export default router;

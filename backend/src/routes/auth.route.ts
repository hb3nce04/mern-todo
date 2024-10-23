import {
	handleLocalAuth,
	handleLogout,
	handleGoogleAuth,
	handleGoogleCallback,
} from "../controllers/auth.controller";
import { loginSchema } from "../utils";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { Router } from "express";
import {
	verifyJwtToken,
	verifyNotJwtToken,
} from "../middlewares/jwt.middleware";

const router = Router();

// Local Auth
router.post(
	"/local",
	verifyNotJwtToken,
	validationMiddleware(loginSchema),
	handleLocalAuth
);

// Google OAuth
router.get("/google", verifyNotJwtToken, handleGoogleAuth);
router.get("/google/callback", verifyNotJwtToken, handleGoogleCallback);

router.post("/logout", verifyJwtToken, handleLogout);

export default router;

import {
	registerUser,
	authenticateUser,
	handleGoogleAuth,
	handleGoogleCallback,
} from "../controllers/auth.controller";
import { loginSchema, registerSchema } from "../utils/validation.util";
import validationMiddleware from "../middlewares/validation.middleware";
import { Router } from "express";

const router = Router();

// Local Auth
router.post("/register", validationMiddleware(registerSchema), registerUser);
router.post("/login", validationMiddleware(loginSchema), authenticateUser);

// Google OAuth
router.get("/google", handleGoogleAuth);
router.get("/google/callback", handleGoogleCallback);

export default router;

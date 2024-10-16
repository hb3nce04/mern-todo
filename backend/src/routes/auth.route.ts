import { Router } from "express";
import { registerUser, authenticateUser } from "../controllers/auth.controller";
import { loginSchema, registerSchema } from "../utils/validation.util";
import validationMiddleware from "../middlewares/validation.middleware";

const router = Router();

router.post("/register", validationMiddleware(registerSchema), registerUser);
router.post("/login", validationMiddleware(loginSchema), authenticateUser);

export default router;

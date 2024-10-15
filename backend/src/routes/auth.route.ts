import { Router } from "express";
import { registerUser, authenticateUser } from "../controllers/auth.controller";
import { loginSchema, registerSchema } from "../utils/validation.util";
import validationMiddleware from "../middlewares/validation.middleware";
import verifyToken from "../middlewares/jwt.middleware";

const router = Router();

//router.post("/signin");
router.post("/register", validationMiddleware(registerSchema), registerUser);
router.post("/login", validationMiddleware(loginSchema), authenticateUser);

router.get("/test", verifyToken, (req, res) => {
	res.send("teszt");
});

export default router;
